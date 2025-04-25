package com.paf.skillsharing.repository;

import com.paf.skillsharing.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
}