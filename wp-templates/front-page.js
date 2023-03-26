import { useQuery, gql } from '@apollo/client';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import {
  Hero,
  Header,
  Footer,
  Main,
  ContainerHome,
  Sidebar,
  NavigationMenu,
  Post,
  FeaturedImage,
  SEO,
} from '../components';

export default function Component() {
  const { data } = useQuery(Component.query, {
    variables: Component.variables(),
  });



  const { title: siteTitle, description: siteDescription } =
    data?.generalSettings;
  const primaryMenu = data?.headerMenuItems?.nodes ?? [];
  const footerMenu = data?.footerMenuItems?.nodes ?? [];
  const posts = data?.postItems?.nodes ?? [];
  console.info(posts[0])
  return (
    <>
      <SEO title={siteTitle} description={siteDescription} />
      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />
      <Main className={"home"}>
        <div class="contenedor">
        <Sidebar>hola</Sidebar>
        <ContainerHome>
            {posts.map((post) => (
              <Post
                title={post.title}
                content={post.excerpt}
                date={post.date}
                author={post.author?.name}
                uri={post.uri}
                featuredImage={post.featuredImage?.node}
              />
            ))}
          </ContainerHome>
          </div>
      </Main>
      <Footer title={siteTitle} menuItems={footerMenu} />
    </>
  );
}

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  ${FeaturedImage.fragments.entry}
  query GetPageData(
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
    postItems: posts(where: {orderby: {field: DATE, order: DESC}}, first: 36) {
      nodes {
        id
        title
        excerpt
        ...FeaturedImageFragment
        date
        uri
        author {
          node {
            name
          }
        }
        categories(first: 1) {
          nodes {
            name
          }
        }
      }
    }
    generalSettings {
      ...BlogInfoFragment
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;

Component.variables = () => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  };
};
