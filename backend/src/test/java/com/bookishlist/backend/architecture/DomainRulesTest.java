package com.bookishlist.backend.architecture;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.classes;

import com.tngtech.archunit.core.importer.ImportOption;
import com.tngtech.archunit.junit.AnalyzeClasses;
import com.tngtech.archunit.junit.ArchTest;
import com.tngtech.archunit.lang.ArchRule;

@AnalyzeClasses(packages = "com.bookishlist.backend", importOptions = ImportOption.DoNotIncludeTests.class)
public class DomainRulesTest {
    @ArchTest
    final static ArchRule lookupDomainDependsOnSelfAndCommonOnly =
        classes().that().resideInAnyPackage("..lookup..")
            .should().onlyBeAccessed()
            .byAnyPackage("..lookup..");

    @ArchTest
    final static ArchRule indexDependsOnSelfOnly =
        classes().that().resideInAnyPackage("..index..")
            .should().onlyBeAccessed()
            .byAnyPackage("..index..");

    @ArchTest
    final static ArchRule configurationDependsOnSelfOnly =
        classes().that().resideInAnyPackage("..configurations..")
            .should().onlyBeAccessed()
            .byAnyPackage("..configurations..");

    @ArchTest
    final static ArchRule controllerAdvisorDependsOnSelfAndCommonOnly =
        classes().that().resideInAnyPackage("..controlleradvisor..")
            .should().onlyBeAccessed()
            .byAnyPackage("..controlleradvisor..");
}
