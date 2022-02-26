# Howlr - *This application is unmaintained*

This is the main repository for the Howlr app. Howlr is written in Javascript, using React Native and the Expo framework. It uses Apollo GraphQL to communicate with the backend. You server code is available here https://github.com/howlrapp/howlr-server.

## Philosophy

Howlr is just an entry point and, unlike most social apps, there's no incentive to make it more captive and to want users to use it everyday (as an example, it's all fine if some users only turn on Howlr once a year when they are in their favorite convention). We want people to find love, friends, room parties, one night hooks-ups or just introduce themselves to their local community.

We deliberately don't want users to interact publicly on the app. Words can hurt, so all written interactions must be accepted by both sides beforehand.

In everything we do we want to encourage kindness, any new feature request (or better, pull request) leading to this goal is encouraged.

## Contributing

### Prerequisite

#### NodeJS

You can get it from your Linux distribution packages, from Homebrew or from [this page](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions-enterprise-linux-fedora-and-snap-packages)

#### Expo-cli

```
npm install -g expo-cli
```

#### Yarn

```
npm install -g yarn
```

### Installation

Just fork this repository and run `yarn` to install the gigabyte of dependencies that any sane React project should have.

### Configuration

The `app.json` file is the main configuration file for Expo projects, update it to suit your needs. The full documentation for the `app.json` file is available [here](https://docs.expo.io/versions/latest/config/app/).

You'll also need a `google-services.json` file if you want to deploy your application in the wild https://docs.expo.io/push-notifications/using-fcm/. The keys listed in our `google-services.json` are bound to our Android application and cannot be used for another application.

### Launching

All you have to do is running `expo run:ios` or `expo run:android` in the application folder.


## Code of conduct

Be kind and respectful to us and to others in everything you say, never hurt and assume benevolence just like we try to do.
