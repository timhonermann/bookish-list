package com.bookishlist.backend.architecture;

import static com.tngtech.archunit.library.Architectures.layeredArchitecture;

import com.tngtech.archunit.core.importer.ImportOption;
import com.tngtech.archunit.junit.AnalyzeClasses;
import com.tngtech.archunit.junit.ArchTest;
import com.tngtech.archunit.lang.ArchRule;

@AnalyzeClasses(packages = "com.bookishlist.backend", importOptions = ImportOption.DoNotIncludeTests.class)
public class LayerRulesTest {
    static final String CONTROLLERS = "Controllers";
    static final String SERVICES = "Services";
    static final String REPOSITORIES = "Repositories";
    static final String MAPPERS = "Mappers";

    @ArchTest
    static final ArchRule layerRules = layeredArchitecture().consideringAllDependencies()
        .layer(CONTROLLERS).definedBy("..controllers..")
        .layer(SERVICES).definedBy("..services..")
        .layer(REPOSITORIES).definedBy("..repositories")
        .layer(MAPPERS).definedBy("..mappers..")
        .whereLayer(REPOSITORIES).mayOnlyBeAccessedByLayers(SERVICES)
        .whereLayer(SERVICES).mayOnlyBeAccessedByLayers(CONTROLLERS, SERVICES)
        .whereLayer(CONTROLLERS).mayNotBeAccessedByAnyLayer()
        .whereLayer(MAPPERS).mayOnlyBeAccessedByLayers(CONTROLLERS);
}
