package virtual_clinic.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import virtual_clinic.demo.Models.User;
@Repository
public interface UserRepo extends JpaRepository<User,Integer> {
}
