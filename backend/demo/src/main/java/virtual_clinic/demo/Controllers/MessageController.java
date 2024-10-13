package virtual_clinic.demo.Controllers;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import virtual_clinic.demo.Models.Message;
import com.mailjet.client.errors.MailjetException;
import com.mailjet.client.MailjetClient;

import com.mailjet.client.MailjetRequest;
import com.mailjet.client.MailjetResponse;
import com.mailjet.client.ClientOptions;
import com.mailjet.client.resource.Emailv31;
@RestController
public class MessageController {
    @MessageMapping("/message/{room}")
    @SendTo("/topic/return-to/{room}")
    public Message getContext(@RequestBody Message message, @DestinationVariable String room) {
        try{
            Thread.sleep(1000);

        }catch (InterruptedException e){
            e.printStackTrace();}
        System.out.println(message.getMessage());
        return message;
    }
}
