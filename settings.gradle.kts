pluginManagement {
    repositories {
        google()
        mavenCentral()
        maven( url = "https://jitpack.io")
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.PREFER_SETTINGS)
    repositories {
        google()
        maven( url = "https://jitpack.io")
        mavenCentral()
    }

}

rootProject.name = "module"
include(":app")
