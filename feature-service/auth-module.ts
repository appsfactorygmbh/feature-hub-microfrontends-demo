export interface IAuthModule {
  logIn(username: string): void;
  logOut(): void;
  subscribe(callback: SubscriptionCallback): void;
  unsubscribe(callback: SubscriptionCallback): void;
}

type SubscriptionCallback = (username: string) => void;

export class MockAuthModule implements IAuthModule {
  private currentUser: string | null = null;
  private subscriptions: SubscriptionCallback[] = [];

  logIn(username: string) {
    console.log(`User ${username} logging in...`);
    if (username && typeof username === "string") {
      this.currentUser = username;
      this.notifySubscribers(username);
    }
  }

  logOut(): void {
    console.log(`User ${this.currentUser} logging out...`);
    this.currentUser = null;
    this.notifySubscribers("");
  }

  subscribe(callback: SubscriptionCallback): void {
    if (this.currentUser) {
      callback(this.currentUser);
    }
    this.addSubscriber(callback);
  }

  unsubscribe(callback: SubscriptionCallback): void {
    const subscriberList = this.subscriptions;

    if (subscriberList) {
      const index = subscriberList.indexOf(callback);
      if (index !== -1) {
        subscriberList.splice(index, 1);
      }
    }
  }

  private addSubscriber(callback: SubscriptionCallback): void {
    this.subscriptions.push(callback);
  }

  private notifySubscribers(username: string): void {
    this.subscriptions.forEach((callback) => callback(username));
  }
}
