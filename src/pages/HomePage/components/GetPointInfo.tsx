import { gradePointQueryOptions, meQueryOptions, type GradePoint } from '@/api/queryOptions';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function GetPointInfo({
  children,
}: {
  children: (pointInfo: {
    currentGrade: string;
    currentPoint: number;
    leftPointToNextGrade: number;
    progress: number;
  }) => React.ReactNode;
}) {
  const { data: gradePointData } = useSuspenseQuery({ ...gradePointQueryOptions() });
  const { data: meData } = useSuspenseQuery({ ...meQueryOptions() });

  const currentGradeMinPoint = getCurrentGradeMinPoint(gradePointData.gradePointList, meData.grade);
  const nextGradeMinPoint = getNextGradeMinPoint(gradePointData.gradePointList, meData.point);
  const progress = (meData.point - currentGradeMinPoint) / (nextGradeMinPoint - currentGradeMinPoint);
  const leftPointToNextGrade = nextGradeMinPoint - meData.point;

  return children({
    currentGrade: meData.grade,
    currentPoint: meData.point,
    leftPointToNextGrade,
    progress,
  });
}

const ascendingByMinPoint = (a: GradePoint, b: GradePoint) => a.minPoint - b.minPoint;

const getNextGradeMinPoint = (gradePointList: GradePoint[], myPoint: number) => {
  const sortedGradePointList = gradePointList.sort(ascendingByMinPoint);
  const nextGrade = sortedGradePointList.find(({ minPoint }) => minPoint > myPoint);

  return nextGrade?.minPoint ?? 0;
};

const getCurrentGradeMinPoint = (gradePointList: GradePoint[], grade: string) => {
  const currentGrade = gradePointList.find(({ type }) => type === grade);
  return currentGrade?.minPoint ?? 0;
};
