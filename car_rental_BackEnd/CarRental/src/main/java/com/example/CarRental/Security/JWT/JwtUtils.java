package com.example.CarRental.Security.JWT;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * this class has three functions:
 * 1.generate jwt from username, date, expiration, secret
 * 2. get username from jwt
 * 3. validate a jwt
 */
@Component
public class JwtUtils {
    private Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    public String generateJwtToken(Authentication authentication){
        UserDetails userDetails = (UserDetails)authentication.getPrincipal();
        String s = Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + 60*1000*30)) //will expire 30 min after login
                .signWith(SignatureAlgorithm.HS512, "mySecretKey")
                .compact();
        logger.warn("generateJwtToken ok");
        return s;
    }

    public String getUsernameFromJwtToken(String token){
        String s= Jwts.parser().setSigningKey("mySecretKey").parseClaimsJws(token).getBody().getSubject();
        logger.warn("getUsernameFromJwtToken ok");
        return s;
    }

    public boolean validateJwtToken(String authToken){
        try{
            Jwts.parser().setSigningKey("mySecretKey").parseClaimsJws(authToken);
            return true;
        } catch (Exception e){
            logger.error("Exception: "+e.getMessage());
            return false;
        }
    }


}
