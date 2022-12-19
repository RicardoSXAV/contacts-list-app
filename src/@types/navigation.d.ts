import { MainStackParamsList } from '../routes';

type NavigationRouteList = MainStackParamsList;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends NavigationRouteList {}
  }
}
