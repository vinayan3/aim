import React from 'react';
import { Grid } from '@material-ui/core';

import GroupingItem from '../GroupingItem/GroupingItem';
import StylePopoverAdvanced from 'pages/Metrics/components/StylePopoverAdvanced/StylePopoverAdvanced';
import ColorPopoverAdvanced from 'pages/Metrics/components/ColorPopoverAdvanced/ColorPopoverAdvanced';
import { IGroupingProps } from 'types/pages/metrics/components/Grouping/Grouping';
import { groupNames } from 'types/services/models/metrics/metricsAppModel';

const groupingPopovers = [
  {
    title: 'Run Color Settings',
    advancedTitle: 'Color Advanced Options',
    groupName: 'color',
    AdvancedComponent: ColorPopoverAdvanced,
  },
  {
    title: 'Select Fields For Grouping by stroke style',
    advancedTitle: 'stroke style advanced options',
    groupName: 'style',
    AdvancedComponent: StylePopoverAdvanced,
  },
  {
    title: 'Select fields to divide into charts',
    groupName: 'chart',
    AdvancedComponent: null,
  },
];

function Grouping({
  groupingData,
  onGroupingSelectChange,
  onGroupingModeChange,
  onGroupingPaletteChange,
  onGroupingReset,
  onGroupingPersistenceChange,
  onGroupingApplyChange,
}: IGroupingProps): React.FunctionComponentElement<React.ReactNode> {
  return (
    <div>
      <span>Group selected metrics By:</span>
      <Grid container spacing={1} justify='center' alignItems='center'>
        {groupingPopovers.map(
          ({ title, advancedTitle, groupName, AdvancedComponent }) => {
            return (
              <Grid key={groupName} item>
                <GroupingItem
                  title={title}
                  advancedTitle={advancedTitle}
                  groupName={groupName as groupNames}
                  groupingData={groupingData}
                  onSelect={onGroupingSelectChange}
                  onGroupingModeChange={onGroupingModeChange}
                  advancedComponent={
                    AdvancedComponent && (
                      <AdvancedComponent
                        onPersistenceChange={onGroupingPersistenceChange}
                        persistence={
                          groupingData?.persistence[
                            groupName as 'color' | 'style'
                          ]
                        }
                        {...(groupName === 'color' && {
                          onGroupingPaletteChange,
                          paletteIndex: groupingData?.paletteIndex,
                        })}
                      />
                    )
                  }
                  onReset={() => onGroupingReset(groupName as groupNames)}
                  onVisibilityChange={() =>
                    onGroupingApplyChange(groupName as groupNames)
                  }
                />
              </Grid>
            );
          },
        )}
      </Grid>
    </div>
  );
}

export default React.memo(Grouping);