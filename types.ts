export enum ScreenType {
  SIGNAL = 'SIGNAL',
  RADAR = 'RADAR',
  PLANS = 'PLANS',
  CART = 'CART',
  ENTER_CODE = 'ENTER_CODE'
}

export interface NavItem {
  icon: any;
  active: boolean;
}