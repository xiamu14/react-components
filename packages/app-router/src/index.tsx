/*
 * @Description: 路由组件
 * @type: class component
 * @Author: Ben
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-23 15:54:01
 * @LastEditTime: 2019-09-24 20:47:25
 */

import React from "react";
import loadable from "react-loadable";
import { Switch, Route } from "react-router-dom";
import Loading from "./loading";

function getComponentAsync(component: string) {
  return loadable({
    loader: () => import(/* webpackChunkName: "[request]" */ `../${component}`),
    loading: Loading,
    timeout: 10000
  });
}

export interface route {
  name: string,
  exact: boolean,
  path: string,
  component: string
}

interface Props {
  router: route[];
}

export default function AppRouter(props: Props) {
  const { router } = props;
  return (
    <Switch>
      {router.map((route, index) => (
        <Route
          key={String(index)}
          exact={route.exact}
          path={route.path}
          component={getComponentAsync(route.component)}
        />
      ))}
    </Switch>
  );
}
