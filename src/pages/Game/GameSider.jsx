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
            <Sider
              style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
              }}
            >
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={<DatabaseOutlined /> }>
                  <Link to={`${url}/list`}>Game Table</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<FormOutlined />}>
                  <Link to={`${url}/edit`}>Edit Game</Link>
                </Menu.Item>
              </Menu>
            </Sider>

            <Layout className="site-layout" style={{ marginLeft: 200 }}>
              <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
                  <Switch>
                    {routes.map((route, index) => (
                    // Render more <Route>s with the same paths as
                    // above, but different components this time.
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
          </Layout>
        </Router>
      </GameProvider>
    )
  }
  
  export default GameSider
