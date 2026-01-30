import { ProgressBar, Spacing, Text } from '@/ui-lib';
import { Box, Flex, styled } from 'styled-system/jsx';

export default function CurrentLevelSection({
  currentGrade,
  currentPoint,
  leftPointToNextGrade,
  progress,
}: {
  currentGrade: string;
  currentPoint: number;
  leftPointToNextGrade: number;
  progress: number;
}) {
  return (
    <styled.section css={{ px: 5, py: 4 }}>
      <Text variant="H1_Bold">현재 등급</Text>
      <Spacing size={4} />
      <Box bg="background.01_white" css={{ px: 5, py: 4, rounded: '2xl' }}>
        <Flex flexDir="column" gap={2}>
          <Text variant="H2_Bold">{toTitleCase(currentGrade)}</Text>
          <ProgressBar value={progress} size="xs" />

          <Flex justifyContent="space-between">
            <Box textAlign="left">
              <Text variant="C1_Bold">현재 포인트</Text>
              <Text variant="C2_Regular" color="neutral.03_gray">
                {currentPoint}p
              </Text>
            </Box>
            <Box textAlign="right">
              <Text variant="C1_Bold">다음 등급까지</Text>

              <Text variant="C2_Regular" color="neutral.03_gray">
                {leftPointToNextGrade}p
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </styled.section>
  );
}

const toTitleCase = (title: string) => {
  const firstChar = title.charAt(0);
  const rest = title.slice(1);
  return firstChar.toUpperCase() + rest.toLowerCase();
};
