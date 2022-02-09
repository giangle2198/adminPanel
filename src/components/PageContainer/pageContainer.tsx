import type { PageContainerProps } from '@ant-design/pro-layout';
import { PageContainer } from '@ant-design/pro-layout';
import { RouteContext } from '@ant-design/pro-layout';
import type {
  BreadcrumbListReturn,
  BreadcrumbProps,
} from '@ant-design/pro-layout/lib/utils/getBreadcrumbProps';
import type { ActionTypesFn } from '../Constants/constants';
import useRouter from '../RouterHook/routerHook';
import { PageHeader } from 'antd';
import type { ReactNode } from 'react';
import { getParamsQuery } from '../Constants/util';
import { getRouteFromMap } from '@/routes/routes';
import styles from '@/components/PageContainer/pageContainer.less';

export interface BreadcrumbPropsExt extends BreadcrumbProps {
  onClick: ActionTypesFn<any, any>;
}
export interface EventTargetExt extends EventTarget {
  href: string;
}

export interface MouseEventExt extends MouseEvent {
  target: EventTargetExt;
}

export interface AuthorizedPageContainerProps extends PageContainerProps {
  children?: ReactNode;
}

const PageHeaderContainer: React.FC<AuthorizedPageContainerProps> = (
  props: AuthorizedPageContainerProps,
) => {
  const router = useRouter();

  const pageHeaderRender = (
    title?: string,
    breadcrumb?: BreadcrumbListReturn,
    onBackAction?: ActionTypesFn<any, any>,
  ) => {
    const routItem = getRouteFromMap(router.location.pathname);
    return (
      <PageHeader
        className="site-page-header"
        onBack={(routItem && routItem.hasBack && onBackAction) || false}
        title={title}
        breadcrumb={breadcrumb}
      />
    );
  };

  const renderHeader = (): ReactNode => {
    return (
      <RouteContext.Consumer>
        {(value) => {
          if (!value) {
            return <PageContainer className={styles.headerContainer} />;
          }

          const { breadcrumb } = value;
          const breadcrumbIns = breadcrumb as BreadcrumbPropsExt;
          if (breadcrumbIns) {
            breadcrumbIns.onClick = (e: MouseEventExt) => {
              e.preventDefault();
              if (!e.target || !e.target.href) return;
              const nextRoute = e.target.href.replace(window.location.origin, '');
              if (nextRoute !== router.pathname) {
                router.push(nextRoute);
              }
            };
          }

          const backOnClick = (e: MouseEvent) => {
            e.preventDefault();
            const pathBack = (getParamsQuery().meta || '') as string;
            if (pathBack !== '') {
              router.push(decodeURIComponent(pathBack));
              return;
            }
            router.history.goBack();
          };
          return (
            <PageContainer
              className={styles.headerContainer}
              title={value.title}
              breadcrumb={value.breadcrumb}
              pageHeaderRender={() =>
                pageHeaderRender(String(value.title), breadcrumb, backOnClick)
              }
            />
          );
        }}
      </RouteContext.Consumer>
    );
  };

  return <PageContainer pageHeaderRender={renderHeader}>{props.children}</PageContainer>;
};

export default PageHeaderContainer;
