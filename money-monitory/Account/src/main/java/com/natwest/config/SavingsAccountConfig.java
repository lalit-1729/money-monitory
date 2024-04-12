package com.natwest.config;


import jakarta.persistence.EntityManagerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(entityManagerFactoryRef = "savingsentityManagerFactory",basePackages = {"com.natwest.Savings.repository"},transactionManagerRef = "savingstransactionManager")
public class SavingsAccountConfig {


    @Bean(name = "savingsdatasource")
    @ConfigurationProperties(prefix = "spring.datasource.freedbcapstone")
    public DataSource dataSource(){
        return DataSourceBuilder.create().build();
    }


    @Bean(name = "savingsentityManagerFactory")
    public LocalContainerEntityManagerFactoryBean entityManagerFactoryBean(EntityManagerFactoryBuilder builder, @Qualifier("savingsdatasource")DataSource dataSource){
        Map<String,Object> properties=new HashMap<>();
        properties.put("hibernate.hbm2ddl.auto","update");
        properties.put("hibernate.dialect","org.hibernate.dialect.MYSQL5Dialect");
        return builder.dataSource(dataSource).packages("com.natwest.Savings.model").persistenceUnit("Savings").build();
    }


    @Bean(name = "savingstransactionManager")
    public PlatformTransactionManager transactionManager(@Qualifier("savingsentityManagerFactory") EntityManagerFactory entityManagerFactory){
        return new JpaTransactionManager(entityManagerFactory);
    }
}
