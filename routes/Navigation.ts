import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from "../screens/Home";
import Clip from "../screens/Clip";
import Flower from "../screens/Flower";
import Napkin from "../screens/Napkin";
import Roundcloth from "../screens/Roundcloth";
import Sash from "../screens/Sash";
import Tablecloth from "../screens/Tablecloth";
import TableclothType from "../screens/TableclothType";
import WeightAndAmount from "../screens/WeightAndAmount";
import Chaircover from "../screens/Chaircover";
import Curtain from "../screens/Curtain";
import Screen from "../screens/Screen";
import Skirt from "../screens/Skirt";
import Tube from "../screens/Tube";
import CurtainType from "../screens/CurtainType";
import HoleCurtain from "../screens/HoleCurtain";

const screens = {
  Home: {
    screen: Home,
    navigationOptions: {
      title: '布的用量'
    }
  },
  Clip: {
    screen: Clip
  },
  Flower: {
    screen: Flower,
    navigationOptions: {
      title: '花'
    }
  },
  Napkin: {
    screen: Napkin,
    navigationOptions: {
      title: '餐巾'
    }
  },
  Roundcloth: {
    screen: Roundcloth,
    navigationOptions: {
      title: '圆形桌布'
    }
  },
  Sash: {
    screen: Sash,
  },
  Tablecloth: {
    screen: Tablecloth,
    navigationOptions: {
      title: '方形桌布'
    }
    
  },
  TableclothType: {
    screen: TableclothType,
    navigationOptions: {
      title: '桌布样'
    }
  },
  WeightAndAmount: {
    screen: WeightAndAmount,
    navigationOptions: {
      title: '布量'
    }
  },
  Chaircover: {
    screen: Chaircover,
    navigationOptions: {
      title: '椅套'
    }
  },
  Curtain: {
    screen: Curtain,
    navigationOptions: {
      title: '打褶窗帘'
    }    
  },
  Screen: {
    screen: Screen,
    navigationOptions: {
      title: '窗纱'
    }
  },
  Skirt: {
    screen: Skirt,
    navigationOptions: {
      title: '卓裙'
    }
  },
  HoleCurtain: {
    screen: HoleCurtain,
    navigationOptions: {
      title: '塑扣窗帘'
    }
  },
  Tube: {
    screen: Tube,
    navigationOptions: {
      title: '滚条布'
    }
  },
  CurtainType: {
    screen: CurtainType,
    navigationOptions: {
      title: '窗帘样'
    }
  }
}

const ScreenStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#eee',
      height: 80
    },
    headerTitleAlign: 'center'
  }
});

export default createAppContainer(ScreenStack);