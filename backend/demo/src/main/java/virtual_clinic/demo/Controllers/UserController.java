package virtual_clinic.demo.Controllers;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import com.mailjet.client.errors.MailjetException;
import com.mailjet.client.MailjetClient;

import com.mailjet.client.MailjetRequest;
import com.mailjet.client.MailjetResponse;
import com.mailjet.client.ClientOptions;
import com.mailjet.client.ClientOptions;

import com.mailjet.client.resource.Emailv31;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import virtual_clinic.demo.Models.EmailRequest;
import virtual_clinic.demo.Models.User;

import virtual_clinic.demo.UserRepo;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserRepo userRepository;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        userRepository.save(user);
        return "Register successful";
    }

    @PostMapping("/update")
    public String updateUser(@RequestBody User user) {
        userRepository.save(user);
        return "Update successful";
    }
    @GetMapping("/user/{id}")
    public User getUser(@PathVariable int id) {
        return userRepository.findById(id).get();
    }
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    @PostMapping("/send-email")
    public ResponseEntity<String> sendEmail(@RequestBody EmailRequest emailRequest) throws MailjetException {
        String apiKey = "f2539eaef84d345229e5420ed95fe34e"; // Replace with your Mailjet API key
        String apiSecret = "8cb2d74c49694c6c4a626f51a66aa086"; // Replace with your Mailjet API secret

        MailjetClient client;
        MailjetRequest request;
        MailjetResponse response;
        client = new MailjetClient(apiKey, apiSecret);
        request = new MailjetRequest(Emailv31.resource)
                .property(Emailv31.MESSAGES, new JSONArray()
                        .put(new JSONObject()
                                .put(Emailv31.Message.FROM, new JSONObject()
                                        .put("Email", "kalravyoma9@gmail.com")
                                        .put("Name", "Me"))
                                .put(Emailv31.Message.TO, new JSONArray()
                                        .put(new JSONObject()
                                                .put("Email", "kalravyoma10@gmail.com")
                                                .put("Name", "You")))
                                .put(Emailv31.Message.SUBJECT, emailRequest.getSubject())
                                .put(Emailv31.Message.TEXTPART, emailRequest.getTextPart())
                                .put(Emailv31.Message.HTMLPART,  emailRequest.getHtmlPart())));
        response = client.post(request);
        System.out.println(response.getStatus());
        System.out.println(response.getData());
        return null;
    }
}
