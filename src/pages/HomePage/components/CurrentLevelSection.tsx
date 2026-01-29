import { gradePointQueryOptions, meQueryOptions } from '@/api/queryOptions';
import ErrorSection from '@/components/ErrorSection';
import { ProgressBar, Spacing, Text } from '@/ui-lib';
import { ErrorBoundary } from '@suspensive/react';
import { SuspenseQuery } from '@suspensive/react-query';
import { Box, Flex, styled } from 'styled-system/jsx';

function CurrentLevelSection() {
  return (
    <styled.section css={{ px: 5, py: 4 }}>
      <Text variant="H1_Bold">현재 등급</Text>

      <Spacing size={4} />

      <ErrorBoundary fallback={<ErrorSection />}>
        <SuspenseQuery {...meQueryOptions()}>
          {({ data: meData }) => (
            <Box bg="background.01_white" css={{ px: 5, py: 4, rounded: '2xl' }}>
              <Flex flexDir="column" gap={2}>
                <Text variant="H2_Bold">
                  {(() => {
                    switch (meData.grade) {
                      case 'EXPLORER':
                        return 'Explorer';
                      case 'PILOT':
                        return 'Pilot';
                      case 'COMMANDER':
                        return 'Commander';
                      default:
                        return 'Unknown';
                    }
                  })()}
                </Text>

                <SuspenseQuery {...gradePointQueryOptions()}>
                  {({ data: gradePointData }) => {
                    const needPoint = gradePointData.gradePointList
                      .filter(item => item.minPoint > meData.point)
                      .sort((a, b) => a.minPoint - b.minPoint)[0].minPoint;
                    return (
                      <>
                        <ProgressBar value={meData.point / needPoint} size="xs" />

                        <Flex justifyContent="space-between">
                          <Box textAlign="left">
                            <Text variant="C1_Bold">현재 포인트</Text>
                            <Text variant="C2_Regular" color="neutral.03_gray">
                              {meData.point}p
                            </Text>
                          </Box>
                          <Box textAlign="right">
                            <Text variant="C1_Bold">다음 등급까지</Text>

                            <Text variant="C2_Regular" color="neutral.03_gray">
                              {needPoint - meData.point}p
                            </Text>
                          </Box>
                        </Flex>
                      </>
                    );
                  }}
                </SuspenseQuery>
              </Flex>
            </Box>
          )}
        </SuspenseQuery>
      </ErrorBoundary>
    </styled.section>
  );
}

export default CurrentLevelSection;
