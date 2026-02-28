import { User, AuthToken } from "tweeter-shared";
import { UserService } from "../model.service/UserService";
import { Presenter, View } from "./Presenter";

export interface LoginView extends View {
  displayErrorMessage: (message: string) => void;
  navigate: (featurePath: string) => void;
  updateUserInfo: (
    currentUser: User,
    displayedUser: User,
    authToken: AuthToken,
    rememberMe: boolean,
  ) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export class LoginPresenter extends Presenter<LoginView> {
  private userService: UserService;
  private rememberMe: boolean;

  public constructor(view: LoginView) {
    super(view);
    this.userService = new UserService();
    this.rememberMe = false;
  }

  public async doLogin(
    props: { originalUrl?: string },
    alias: string,
    password: string,
  ) {
    this.doFailureReportingOperation(
      async () => {
        this.view.setIsLoading(true);

        const [user, authToken] = await this.userService.login(alias, password);

        this.view.updateUserInfo(user, user, authToken, this.rememberMe);

        if (!!props.originalUrl) {
          this.view.navigate(props.originalUrl);
        } else {
          this.view.navigate(`/feed/${user.alias}`);
        }
      },
      "log user in",
      () => this.view.setIsLoading(false),
    );
  }

  public checkSubmitButtonStatus = (
    alias: string,
    password: string,
  ): boolean => {
    return !alias || !password;
  };

  public loginOnEnter(
    event: React.KeyboardEvent<HTMLElement>,
    props: { originalUrl?: string },
    alias: string,
    password: string,
  ) {
    if (
      event.key == "Enter" &&
      !this.checkSubmitButtonStatus(alias, password)
    ) {
      this.doLogin(props, alias, password);
    }
  }

  public set RememberMe(rememberMe: boolean) {
    this.rememberMe = rememberMe;
  }
}
