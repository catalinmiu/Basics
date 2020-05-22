package com.basics.backend.service;

import com.basics.backend.model.User;
import com.basics.backend.model.UserDetailsImpl;
import com.basics.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByEmail(s);
        if (! user.isPresent()) throw new UsernameNotFoundException(s + " was not found!");
        User foundUser = user.get();
        return new UserDetailsImpl(foundUser);
    }
}