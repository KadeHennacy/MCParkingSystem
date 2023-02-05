package com.kade.mcps.repository;

import com.kade.mcps.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


// https://www.baeldung.com/spring-data-derived-queries


@Repository
//@Transactional(readOnly = true)
public interface UserRepository
        extends JpaRepository<User, Long> {

    //    I was actually very confused trying to figure out where this gets implemented. It turns out that if you use a specific naming convention, Spring Data Jpa can automatically implement these methods. For example, since the generic type of JpaRepository is User, it knows that user has the column email so it knows how to do findByEmail.
    Optional<User> findByUsername(String username);


//    in the tutorial it uses this code for a CrudRepository. Im trying to see if above works the same, though i may need the query annotation.
//    if it doesn't work check this https://www.baeldung.com/spring-data-jpa-query
//    @Query("SELECT u FROM User u WHERE u.username = :username")
//    public User getUserByUsername(@Param("username") String username);

}
