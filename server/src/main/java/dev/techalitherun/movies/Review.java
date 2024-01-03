package dev.techalitherun.movies;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Review {
    
    @Id
    private ObjectId id;

    private String body;

    public Review(String body) {
        this.body = body;
    }
}
