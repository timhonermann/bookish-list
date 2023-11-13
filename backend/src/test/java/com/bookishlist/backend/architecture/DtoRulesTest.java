package com.bookishlist.backend.architecture;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.classes;

import com.tngtech.archunit.core.importer.ImportOption;
import com.tngtech.archunit.junit.AnalyzeClasses;
import com.tngtech.archunit.junit.ArchTest;
import com.tngtech.archunit.lang.ArchRule;

@AnalyzeClasses(packages = "com.bookishlist.backend", importOptions = ImportOption.DoNotIncludeTests.class)
public class DtoRulesTest {
    @ArchTest
    final static ArchRule dtosShouldContainRecordsOrEnums =
        classes()
            .that().resideInAnyPackage("..dtos")
            .should().beRecords()
            .orShould().beEnums();
}
