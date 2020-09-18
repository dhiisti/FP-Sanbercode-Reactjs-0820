import { Layout, Menu } from 'antd';
import {
  FormOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';
import React, { useContext} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import GameTable from './GameTable'
import GameForm from './GameForm'
import {GameProvider} from '../../context/GameContext'

const { Content, Sider } = Layout;

const GameSider = () =>{
  let { path, url } = useRouteMatch();

  const routes = [
      {
          path: `${url}/list`,
          exact: true,
          main: () => <GameTable/>
      },
      {
          path: `${url}/edit`,
          main: () => <GameForm/>
      },
  ];

    return(
      <GameProvider>
        <Router>
        <Layout>
            <Content style={{ padding: '0 50px' }}>
              <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                <Sider className="site-layout-background" width={200} style={{height:"200px"}}>
                  <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%' }}
                  >
                    <Menu.Item key="1" icon={<DatabaseOutlined /> }>
                      <Link to={`${url}/list`}>Game Table</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<FormOutlined />}>
                      <Link to={`${url}/edit`}>Edit Game</Link>
                    </Menu.Item>
                  </Menu>
                </Sider>
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                  <p>Silahkan edit daftar filmnya</p>
                  <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
                    <Switch>
                      {routes.map((route, index) => (
                      <Route
                          key={index}
                          path={route.path}
                          exact={route.exact}
                          children={<route.main />}
                      />
                      ))}
                    </Switch>
                  </div>
                </Content>
              </Layout>
            </Content>
          </Layout>
        </Router>
      </GameProvider>
    )
  }
  
  export default GameSider
