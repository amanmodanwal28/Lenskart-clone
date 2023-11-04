plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("kotlin-android-extensions")
    id("kotlin-kapt")
}

android {
    namespace = "com.example.module"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.example.module"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
    kotlinOptions {
        jvmTarget = "1.8"
    }
    buildFeatures{
        viewBinding = true
    }
}
dependencies {

    implementation("androidx.core:core-ktx:1.9.0")
    implementation("androidx.appcompat:appcompat:1.6.1")
    implementation("com.google.android.material:material:1.9.0")
    implementation("androidx.constraintlayout:constraintlayout:2.1.4")
/////
//    implementation ("com.android.databinding:viewbinding:7.3.1")
    implementation ("com.jcraft:jsch:0.1.55")
    implementation("org.jsoup:jsoup:1.14.2")
//    implementation("com.google.android.exoplayer:exoplayer:2.19.1")
//    implementation ("com.google.android.exoplayer:exoplayer-core:2.15.0")
//    implementation("androidx.media3:media3-exoplayer:1.0.2")
//    implementation("androidx.media3:media3-exoplayer-dash:1.0.2")
//    implementation("androidx.media3:media3-exoplayer-hls:1.0.2")
//    implementation("androidx.media3:media3-ui:1.0.2")
//    implementation("androidx.media3:media3-session:1.0.2")
//    implementation("androidx.media3:media3-datasource-okhttp:1.0.2")
//    implementation("com.squareup.picasso:picasso:2.8")
//    implementation("com.github.bumptech.glide:glide:4.15.1")
    implementation("org.videolan.android:libvlc-all:4.0.0-eap13")
    implementation("androidx.media3:media3-ui:1.1.1")
    testImplementation("junit:junit:4.13.2")
    androidTestImplementation("androidx.test.ext:junit:1.1.5")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.5.1")



}