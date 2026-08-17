@file:Suppress("DSL_SCOPE_VIOLATION", "UnstableApiUsage")

import com.cloudx.ios17.buildsrc.Versions
import java.util.Properties

plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.kapt)
}

val versionMajor = 1
val versionMinor = 15
val versionPatch = 0

val localProps = Properties()
val localPropsFile = project.rootProject.file("local.properties")
if (localPropsFile.exists()) {
    localProps.load(localPropsFile.inputStream())
}

val appendDebugSuffix = (localProps.getProperty("appendDebugSuffix") ?: "true").toBoolean()
val keyStorePath = localProps.getProperty("keyStorePath") ?: "/keystore/platform.keystore"
val keyStorePassword = localProps.getProperty("keyStorePassword") ?: "android"
val signingKeyAlias = localProps.getProperty("keyAlias") ?: "platform"
val signingKeyPassword = localProps.getProperty("keyPassword") ?: "android"
val platformKeystore = file(rootDir.path + keyStorePath)

android {
    namespace = "com.cloudx.ios17"
    compileSdk = Versions.COMPILE_SDK

    defaultConfig {
        applicationId = "com.cloudx.ios17"
        minSdk = Versions.MIN_SDK
        targetSdk = Versions.TARGET_SDK

        versionCode = versionMajor * 100_00_00 + versionMinor * 10_00 + versionPatch
        versionName = "${versionMajor}.${versionMinor}.${versionPatch}"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    signingConfigs {
        getByName("debug") {
            if (platformKeystore.exists()) {
                storeFile = platformKeystore
                storePassword = keyStorePassword
                keyAlias = signingKeyAlias
                keyPassword = signingKeyPassword
            }
        }
    }

    buildFeatures {
        buildConfig = true
        viewBinding = true
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
            signingConfig = signingConfigs.getByName("debug")
        }

        debug {
            if (appendDebugSuffix) {
                applicationIdSuffix = ".debug"
            }
            signingConfig = signingConfigs.getByName("debug")
        }

        create("benchmark") {
            signingConfig = signingConfigs.getByName("debug")
            matchingFallbacks += listOf("release")
            isDebuggable = false
        }

        configureEach {
            buildConfigField("String", "SENTRY_DSN", "\"${System.getenv("SENTRY_DSN") ?: ""}\"")
        }
    }

    flavorDimensions += "api"
    productFlavors {
        create("apiQ") {
            dimension = "api"
            minSdk = 27
            targetSdk = 29
        }
        create("apiR") {
            dimension = "api"
            minSdk = 27
            targetSdk = 29
        }
        create("apiS") {
            dimension = "api"
            minSdk = 27
            targetSdk = 29
        }
    }

    testOptions {
        unitTests.all {
            it.testLogging { events("passed", "skipped", "failed", "standardOut", "standardError") }
        }
    }

    compileOptions {
        isCoreLibraryDesugaringEnabled = true
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions { jvmTarget = "17" }

    lint {
        abortOnError = false
        checkReleaseBuilds = false
        warningsAsErrors = false
        disable += setOf("PluralsCandidate", "MissingTranslation", "UnusedResources")
        baseline = file("lint-baseline.xml")
    }

    packaging {
        resources {
            excludes += "/META-INF/{AL2.0,LGPL2.1}"
            excludes += "META-INF/DEPENDENCIES"
        }
    }
}

kapt { correctErrorTypes = true }

dependencies {
    "apiQImplementation"(files("libs/lineage-sdk-q.jar"))
    "apiRImplementation"(files("libs/lineage-sdk-r.jar"))
    "apiSImplementation"(files("libs/e-ui-sdk-s.jar"))

    implementation(libs.androidx.appcompat)
    implementation(libs.androidx.recyclerview)
    implementation(libs.androidx.localbroadcast)

    implementation(libs.rx.android)
    implementation(libs.rx.binding)
    implementation(libs.rx.java)
    implementation(libs.rx.relay)

    implementation(libs.androidx.room.runtime)
    kapt(libs.androidx.room.compiler)

    implementation(libs.retrofit)
    implementation(libs.retrofit.gson.converter)
    implementation(libs.retrofit.rxjava.adapter)

    implementation(libs.okhttp)
    implementation(libs.okhttp.logging)

    implementation(libs.hoko.blur)
    implementation(libs.apache.commons)
    implementation(libs.kotlin.stdlib.jdk7)
    implementation(libs.greenrobot.eventbus)
    implementation(libs.circleindicator)
    implementation(libs.tools.timber)
    coreLibraryDesugaring(libs.tools.desugar)
    implementation(libs.androidx.profileinstaller)
    implementation(project(":gree"))
    debugImplementation(libs.tools.leakcanary)

    testImplementation(libs.bundles.testing.unit)
    testImplementation(libs.bundles.testing.android)
}
