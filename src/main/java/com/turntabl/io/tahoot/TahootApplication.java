package com.turntabl.io.tahoot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import springfox.documentation.swagger2.annotations.EnableSwagger2;
import com.cloudinary.*;
@EnableSwagger2
@SpringBootApplication
public class TahootApplication {

    public static void main(String[] args) {
        SpringApplication.run(TahootApplication.class, args);
    }

}
