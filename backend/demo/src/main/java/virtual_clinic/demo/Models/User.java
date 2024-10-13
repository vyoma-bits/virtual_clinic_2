package virtual_clinic.demo.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import java.lang.annotation.Documented;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {
    @Id
    private int id;
    private String name;
    private int number;
    private String address;
    private boolean covidVaccinated;
    private boolean fluVaccinated;
    private boolean hepatitisBVaccinated;
    private boolean measles;
    private boolean tuberculosis;
    private boolean diabetes;
}
