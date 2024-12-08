package com.natwest.Savings.repository;

import com.natwest.Savings.model.Savings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountUserRepository extends JpaRepository<Savings,String> {

    Savings findByEmail(String email);

}
