@file:Suppress("UnstableApiUsage", "DSL_SCOPE_VIOLATION")

import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins { `kotlin-dsl` }

java {
    sourceCompatibility = JavaVersion.VERSION_17
    targetCompatibility = JavaVersion.VERSION_17
}

tasks.withType<JavaCompile>().configureEach {
    sourceCompatibility = JavaVersion.VERSION_17.toString()
    targetCompatibility = JavaVersion.VERSION_17.toString()
}

tasks.withType<KotlinCompile>().configureEach { kotlinOptions { jvmTarget = "17" } }

dependencies { implementation(libs.build.spotless) }

gradlePlugin {
    plugins {
        register("spotless") {
            id = "com.cloudx.ios17.spotless"
            implementationClass = "com.cloudx.ios17.gradle.SpotlessPlugin"
        }
    }
}
