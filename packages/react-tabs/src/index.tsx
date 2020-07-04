import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  isValidElement,
  cloneElement,
} from 'react';

import useConstant from 'use-constant';

interface TabsProps {
  defaultIndex?: number;
}
interface ElementsType {
  tabs: number,
  panels: number,
}

interface TabsStateType {
  state: any,
  prevState: any,
}

const TabsState = createContext<TabsStateType>({ state: null, prevState: null });
const Elements = createContext<ElementsType>({ tabs: 0, panels: 0 });

export const Tabs = ({ defaultIndex, children }: React.PropsWithChildren<TabsProps>) => {
  const state = useState<number>(defaultIndex || 0);
  const prevState = useState<number | null>(null); // 存储上一次 state;
  const elements = { tabs: 0, panels: 0 };

  return (
    <Elements.Provider value={elements}>
      <TabsState.Provider value={{ state, prevState }}>{children}</TabsState.Provider>
    </Elements.Provider>
  )
}

export const usePrevTabState = () => {
  const { prevState, state } = useContext(TabsState);

  return { activeTab: state[0], prevTab: prevState[0] };
}

export const useTabState = () => {
  const { state, prevState } = useContext(TabsState);
  const [activeIndex, setActive] = state;
  const setPrevIndex = prevState[1];

  const elements = useContext<ElementsType>(Elements)

  // const tabIndex = useConstant(() => {
  //   const currentIndex = elements.tabs
  //   elements.tabs += 1

  //   return currentIndex

  // });

  const tabIndex = elements.tabs;
  elements.tabs += 1;

  const onClick = useConstant(
    () => (v: number) => {
      if (v !== tabIndex) {
        setPrevIndex(v); // 缓存为上一次
      }
      setActive(tabIndex);
    }
  )
  return useMemo(
    () => ({
      isActive: activeIndex === tabIndex,
      activeIndex,
      onClick
    }),
    [activeIndex, onClick, tabIndex]
  )
}

export const usePanelState = () => {
  const { state } = useContext(TabsState)
  const elements = useContext(Elements)

  // const panelIndex = useConstant(() => {
  //   const currentIndex = elements.panels
  //   elements.panels += 1

  //   return currentIndex
  // })

  const panelIndex = elements.panels
  elements.panels += 1

  return panelIndex === state[0];
}

export const Tab = ({ children }: { children: React.ReactNode }) => {
  const state = useTabState();
  // NOTE: react 内部使用规则
  const props = {
    activeindex: state.activeIndex,
    isactive: state.isActive.toString(),
    onClick: () => state.onClick(state.activeIndex),
    className: `${state.isActive ? "active" : ""}`
  };
  if (typeof children === 'function') {
    return children(props);
  }

  // @ts-ignore
  props.className += ` ${children.props.className ? children.props.className : ''}`;

  return isValidElement(children) ? cloneElement(children, { ...children.props, ...props }) : children
}

export const Panel = ({ children }: { children: React.ReactNode }): any => {
  const isActive = usePanelState()
  // TODO: 这里需要优化动画
  return isActive ? children : null;
}
