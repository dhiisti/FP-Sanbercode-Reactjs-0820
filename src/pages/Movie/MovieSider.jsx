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
import MovieTable from './MovieTable'
import MovieForm from './MovieForm'
// import MovieForm from './MovieForm'
import {MovieProvider} from '../../context/MovieContext'

const { Content, Sider } = Layout;

const MovieSider = () =>{
  let { path, url } = useRouteMatch();

  const routes = [
      {
          path: `${url}/list`,
          exact: true,
          main: () => <MovieTable/>
      },
      {
          path: `${url}/edit`,
          main: () => <MovieForm/>
      },
  ];

    return(
      <MovieProvider>
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
                  <Link to={`${url}/list`}>Movie Table</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<FormOutlined />}>
                  <Link to={`${url}/edit`}>Edit Movie</Link>
                </Menu.Item>
              </Menu>
            </Sider>

            <Layout className="site-layout" style={{ marginLeft: 200 }}>
              <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                <p>Silahkan edit daftar filmnya</p>
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
      </MovieProvider>
    )
  }
  
  export default MovieSider
