import { render, screen, within } from "@testing-library/react-native";
import { RepositoryListContainer } from "../components/RepositoryListContainer";
import { addSeparatorToNumber } from "../utils/mathHelpers";

describe('RepositoryList', () => {
    describe('RepositoryListContainer', () => {
      it('renders repository information correctly', () => {
        const repositories = {
          totalCount: 8,
          pageInfo: {
            hasNextPage: true,
            endCursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          edges: [
            {
              node: {
                id: 'jaredpalmer.formik',
                fullName: 'jaredpalmer/formik',
                description: 'Build forms in React, without the tears',
                language: 'TypeScript',
                forksCount: 1619,
                stargazersCount: 21856,
                ratingAverage: 88,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars2.githubusercontent.com/u/4060187?v=4',
              },
              cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
            },
            {
              node: {
                id: 'async-library.react-async',
                fullName: 'async-library/react-async',
                description: 'Flexible promise-based React data loader',
                language: 'JavaScript',
                forksCount: 69,
                stargazersCount: 1760,
                ratingAverage: 72,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars1.githubusercontent.com/u/54310907?v=4',
              },
              cursor:
                'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            },
          ],
        };
        
        // Add your test code here
        render(<RepositoryListContainer repositories={repositories}/>)

        const repositoryInfoItems = screen.getAllByTestId('repositoryInfo');
        const [firstRepositoryInfo, secondRepositoryInfo] = repositoryInfoItems;
        const reviewSectionItems = screen.getAllByTestId('reviewSection');
        const [firstReviewSection, secondReviewSection] = reviewSectionItems;

        const stargazerCountSectionInFirstReviewSection = within(firstReviewSection).getByTestId('stargazersCount');
        const forksCountSectonInFirstReviewSection = within(firstReviewSection).getByTestId('forksCount');
        const reviewCountSectonInFirstReviewSection = within(firstReviewSection).getByTestId('reviewCount');
        const ratingAverageSectonInFirstReviewSection = within(firstReviewSection).getByTestId('ratingAverage');
        const stargazerCountSectionInSecondReviewSection = within(secondReviewSection).getByTestId('stargazersCount');
        const forksCountSectonInSecondReviewSection = within(secondReviewSection).getByTestId('forksCount');
        const reviewCountSectonInSecondReviewSection = within(secondReviewSection).getByTestId('reviewCount');
        const ratingAverageSectonInSecondReviewSection = within(secondReviewSection).getByTestId('ratingAverage');

        expect(within(firstRepositoryInfo).getByTestId('language')).toHaveTextContent(`${repositories.edges[0].node.language}`);
        expect(within(firstRepositoryInfo).getByTestId('name')).toHaveTextContent(`${repositories.edges[0].node.fullName}`);
        expect(within(firstRepositoryInfo).getByTestId('description')).toHaveTextContent(`${repositories.edges[0].node.description}`);
        expect(within(secondRepositoryInfo).getByTestId('language')).toHaveTextContent(`${repositories.edges[1].node.language}`);
        expect(within(secondRepositoryInfo).getByTestId('name')).toHaveTextContent(`${repositories.edges[1].node.fullName}`);
        expect(within(secondRepositoryInfo).getByTestId('description')).toHaveTextContent(`${repositories.edges[1].node.description}`);

        expect(within(stargazerCountSectionInFirstReviewSection).getByTestId('count')).toHaveTextContent(`${addSeparatorToNumber(repositories.edges[0].node.stargazersCount)}`);
        expect(within(forksCountSectonInFirstReviewSection).getByTestId('count')).toHaveTextContent(`${addSeparatorToNumber(repositories.edges[0].node.forksCount)}`);
        expect(within(reviewCountSectonInFirstReviewSection).getByTestId('count')).toHaveTextContent(`${addSeparatorToNumber(repositories.edges[0].node.reviewCount)}`);
        expect(within(ratingAverageSectonInFirstReviewSection).getByTestId('count')).toHaveTextContent(`${addSeparatorToNumber(repositories.edges[0].node.ratingAverage)}`);
        expect(within(stargazerCountSectionInSecondReviewSection).getByTestId('count')).toHaveTextContent(`${addSeparatorToNumber(repositories.edges[1].node.stargazersCount)}`);
        expect(within(forksCountSectonInSecondReviewSection).getByTestId('count')).toHaveTextContent(`${addSeparatorToNumber(repositories.edges[1].node.forksCount)}`);
        expect(within(reviewCountSectonInSecondReviewSection).getByTestId('count')).toHaveTextContent(`${addSeparatorToNumber(repositories.edges[1].node.reviewCount)}`);
        expect(within(ratingAverageSectonInSecondReviewSection).getByTestId('count')).toHaveTextContent(`${addSeparatorToNumber(repositories.edges[1].node.ratingAverage)}`);

      });
    });
});