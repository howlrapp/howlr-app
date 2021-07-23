# Howlr

This is the main repository for the Howlr app.

### Which languages and/or framework does Howlr use?

Howlr is written in Javascript, using React Native and the Expo framework. It uses Apollo GraphQL to communicate with the backend.

### Why do you open-source it?

Because there's no reason not to do it: Howlr is not a business, we made it to learn some React Native and to do something useful for our community, so really there's nothing preventing us for sharing the code.

### Can I contribute?

Sure thing! Please fork and post some pull requests, if you're thinking about adding some new features feel free to post a feature request in the issues before you start working on it, so we can talk about the best way to implement it.

### I'm not happy with Howlr, can I fork it and distribute my own app?

Of course! Two things though: you may want to wait until we open-source the backend code so you can run your own server and also don't forget that Howlr is distributed under the GPL3 licence.

### How much does Howlr cost?

It's currently pretty cheap, around 100€/month, and a good part of it is covered by our awesome contributors on Patreon. If you feel like donating a small amount you can [join our $2 tier](https://www.patreon.com/HowlrApp).

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

The `app.json` file is the main configuration file for Expo projects, we provide a sample configuration file `app.json.sample` that you can copy to `app.json` and modify to suit your needs. The full documentation for the `app.json` file is available [here](https://docs.expo.io/versions/latest/config/app/).

You'll also need a `google-services.json` file if you want to deploy your application in the wild https://docs.expo.io/push-notifications/using-fcm/.

### Launching

All you have to do is running `expo run:ios` or `expo run:android` in the application folder.


## Code of conduct

Be kind and respectful to us and to others in everything you say, never hurt and assume benevolence just like we try to do.
