package com.bookishlist.backend.architecture;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.classes;

import com.tngtech.archunit.core.importer.ImportOption;
import com.tngtech.archunit.junit.AnalyzeClasses;
import com.tngtech.archunit.junit.ArchTest;
import com.tngtech.archunit.lang.ArchRule;
import jakarta.persistence.Entity;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

@AnalyzeClasses(packages = "com.bookishlist.backend", importOptions = ImportOption.DoNotIncludeTests.class)
public class AnnotationRulesTest {
    @ArchTest
    final static ArchRule serviceAnnotatedClassShouldHaveServicePostfix = classes()
        .that().areAnnotatedWith(Service.class)
        .should().haveSimpleNameEndingWith("Service");

    @ArchTest
    final static ArchRule controllerAnnotatedClassShouldHaveControllerPostfix = classes()
        .that().areAnnotatedWith(RestController.class)
        .or().areAnnotatedWith(Controller.class)
        .should().haveSimpleNameEndingWith("Controller");


     @ArchTest final static ArchRule repositoryAnnotatedClassShouldHaveRepositoryPostfix = classes()
     .that().areAnnotatedWith(Repository.class)
     .should().haveSimpleNameEndingWith("Repository");

     @ArchTest final static ArchRule entityAnnotatedClassShouldResideInEntityPackage = classes()
     .that().areAnnotatedWith(Entity.class)
     .should().resideInAnyPackage("..entities..");
}
