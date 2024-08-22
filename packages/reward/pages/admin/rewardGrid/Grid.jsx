import PropTypes from 'prop-types';
import React, { useState } from 'react';
import axios from 'axios';
import Area from '@components/common/Area';
import Pagination from '@components/common/grid/Pagination';
import { Checkbox } from '@components/common/form/fields/Checkbox';
import { useAlertContext } from '@components/common/modal/Alert';
import CouponName from '@components/admin/promotion/couponGrid/rows/CouponName';
import BasicRow from '@components/common/grid/rows/BasicRow';
import StatusRow from '@components/common/grid/rows/StatusRow';
import { Card } from '@components/admin/cms/Card';
import TextRow from '@components/common/grid/rows/TextRow';
import { Form } from '@components/common/form/Form';
import { Field } from '@components/common/form/Field';
import SortableHeader from '@components/common/grid/headers/Sortable';
import DummyColumnHeader from '@components/common/grid/headers/Dummy';
import Filter from '@components/common/list/Filter';

function Actions({ rewards = [], selectedIds = [] }) {
  const { openAlert, closeAlert } = useAlertContext();
  const [isLoading, setIsLoading] = useState(false);

  const updateRewards = async (status) => {
    setIsLoading(true);
    const promises = rewards
      .filter((reward) => selectedIds.includes(reward.uuid))
      .map((reward) =>
        axios.patch(reward.updateApi, {
          status,
          reward: reward.reward
        })
      );
    await Promise.all(promises);
    setIsLoading(false);
    // Refresh the page
    window.location.reload();
  };

  const deleteReward = async () => {
    setIsLoading(true);
    const promises = rewards
      .filter((reward) => selectedIds.includes(reward.uuid))
      .map((reward) => axios.delete(reward.deleteApi));
    await Promise.all(promises);
    setIsLoading(false);
    // Refresh the page
    window.location.reload();
  };

  const actions = [
    {
      name: 'Disable',
      onAction: () => {
        openAlert({
          heading: `Disable ${selectedIds.length} rewards`,
          content: 'Are you sure?',
          primaryAction: {
            title: 'Cancel',
            onAction: closeAlert,
            variant: 'primary'
          },
          secondaryAction: {
            title: 'Disable',
            onAction: async () => {
              await updateRewards(0);
            },
            variant: 'critical',
            isLoading: false
          }
        });
      }
    },
    {
      name: 'Enable',
      onAction: () => {
        openAlert({
          heading: `Enable ${selectedIds.length} rewards`,
          content: 'Are you sure?',
          primaryAction: {
            title: 'Cancel',
            onAction: closeAlert,
            variant: 'primary'
          },
          secondaryAction: {
            title: 'Enable',
            onAction: async () => {
              await updateRewards(1);
            },
            variant: 'critical',
            isLoading: false
          }
        });
      }
    },
    {
      name: 'Delete',
      onAction: () => {
        openAlert({
          heading: `Delete ${selectedIds.length} rewards`,
          content: <div>Can&apos;t be undone</div>,
          primaryAction: {
            title: 'Cancel',
            onAction: closeAlert,
            variant: 'primary'
          },
          secondaryAction: {
            title: 'Delete',
            onAction: async () => {
              await deleteReward();
            },
            variant: 'critical',
            isLoading
          }
        });
      }
    }
  ];

  return (
    <tr>
      {selectedIds.length === 0 && null}
      {selectedIds.length > 0 && (
        <td style={{ borderTop: 0 }} colSpan="100">
          <div className="inline-flex border border-divider rounded justify-items-start">
            <a href="#" className="font-semibold pt-075 pb-075 pl-15 pr-15">
              {selectedIds.length} selected
            </a>
            {actions.map((action) => (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  action.onAction();
                }}
                className="font-semibold pt-075 pb-075 pl-15 pr-15 block border-l border-divider self-center"
              >
                <span>{action.name}</span>
              </a>
            ))}
          </div>
        </td>
      )}
    </tr>
  );
}

Actions.propTypes = {
  selectedIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  rewards: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string.isRequired,
      updateApi: PropTypes.string.isRequired,
      deleteApi: PropTypes.string.isRequired,
      reward: PropTypes.string.isRequired
    })
  ).isRequired
};



export default function rewardGrid(
  { rewards: { items: rewards, total, currentFilters = [] }}
) {
  console.log(rewards)
  const page = currentFilters.find((filter) => filter.key === 'page')
    ? currentFilters.find((filter) => filter.key === 'page').value
    : 1;
  const limit = currentFilters.find((filter) => filter.key === 'limit')
    ? currentFilters.find((filter) => filter.key === 'limit').value
    : 20;
  const [selectedRows, setSelectedRows] = useState([]);
  console.log(rewards)

  return (

      <Card>
        <Card.Session
          title={
            <Form id='' submitBtn={false}>
              <div className="flex gap-2 justify-center items-center">
                <Area
                  id="rewardGridFilter"
                  noOuter
                  coreComponents={[
                    {
                      component: {
                        default: () => (
                          <Field
                            name="reward" 
                            type="text"
                            id="reward"
                            placeholder="Search"
                            value={
                              currentFilters.find((f) => f.key === 'reward')
                                ?.value
                            }
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                const url = new URL(document.location);
                                const reward =
                                  document.getElementById('reward')?.value;
                                if (reward) {
                                  url.searchParams.set(
                                    'reward[operation]',
                                    'like'
                                  );
                                  url.searchParams.set('reward[value]', reward);
                                } else {
                                  url.searchParams.delete('reward[operation]');
                                  url.searchParams.delete('reward[value]');
                                }
                                window.location.href = url;
                              }
                            }}
                          />
                        )
                      },
                      sortOrder: 5
                    },
                    {
                      component: {
                        default: () => (
                          <Filter
                            options={[
                              {
                                label: 'Enabled',
                                value: '1',
                                onSelect: () => {
                                  const url = new URL(document.location);
                                  url.searchParams.set('status', 1);
                                  window.location.href = url;
                                }
                              },
                              {
                                label: 'Disabled',
                                value: '0',
                                onSelect: () => {
                                  const url = new URL(document.location);
                                  url.searchParams.set('status', 0);
                                  window.location.href = url;

                                }
                              }
                            ]}
                            selectedOption={
                              currentFilters.find((f) => f.key === 'status')
                                ? currentFilters.find((f) => f.key === 'status')
                                    .value === '1'
                                  ? 'Enabled'
                                  : 'Disabled'
                                : undefined
                            }
                            title="Status"
                          />
                        )
                      },
                      sortOrder: 10
                    }
                  ]}
                  currentFilters={currentFilters}
                />
              </div>
            </Form>
          }
          actions={[
            {
              variant: 'interactive',
              name: 'Clear filter',
              onAction: () => {
                // Just get the url and remove all query params
                const url = new URL(document.location);
                url.search = '';
                window.location.href = url.href;
              }
            }
          ]}
      /> 
      {/* aqui cierra cesion */}
      


      <table className="listing sticky">
        <thead>
          <tr>
            <th className="align-bottom">
              <Checkbox
                onChange={(e) => {
                  if (e.target.checked)
                    setSelectedRows(rewards.map((c) => c.uuid));
                  else setSelectedRows([]);
                }}
              />
            </th>
            <Area
              id="rewardGridHeader"
              noOuter
              coreComponents={[
                {
                  // eslint-disable-next-line react/no-unstable-nested-components
                  // Quitar el sort y ponerlo como name
                  component: {
                    default: () => <DummyColumnHeader title="Name" />
                  },
                  sortOrder: 10
                },
                {
                  // eslint-disable-next-line react/no-unstable-nested-components
                  component: {
                    default: () => <DummyColumnHeader title="Points required" />
                  },
                  sortOrder: 20
                },
                {
                  // eslint-disable-next-line react/no-unstable-nested-components
                  component: {
                    default: () => <DummyColumnHeader title="Discount amount" />
                  },
                  sortOrder: 30
                },
                {
                  // eslint-disable-next-line react/no-unstable-nested-components
                  component: {
                    default: () => <DummyColumnHeader title="Start Date" />
                  },
                  sortOrder: 40
                },
                {
                  // eslint-disable-next-line react/no-unstable-nested-components
                  component: {
                    default: () => <DummyColumnHeader title="End Date" />
                  },
                  sortOrder: 50
                },
                {
                  // eslint-disable-next-line react/no-unstable-nested-components
                  component: {
                    default: () => (
                      <SortableHeader
                        title="Status"
                        name="status"
                        currentFilters={currentFilters}
                      />
                    )
                  },
                  sortOrder: 60
                }
              ]}
            />
          </tr>
        </thead>
        <tbody>
          <Actions
            rewards={rewards}
            selectedIds={selectedRows}
            setSelectedRows={setSelectedRows}
          />
          {rewards.map((c) => (
            <tr key={c.rewardId}>
              <td>
                <Checkbox
                  isChecked={selectedRows.includes(c.uuid)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRows(selectedRows.concat([c.uuid]));
                    } else {
                      setSelectedRows(
                        selectedRows.filter((row) => row !== c.uuid)
                      );
                    }
                  }}
                />
              </td>
              <Area
                id="rewardGridRow"
                row={c}
                noOuter
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                coreComponents={[
                  {
                    // eslint-disable-next-line react/no-unstable-nested-components
                    component: {
                      default: () => (
                        <CouponName url={c.editUrl} name={c.name} />
                      )
                    },
                    sortOrder: 10
                  },
                  {
                    // eslint-disable-next-line react/no-unstable-nested-components
                    component: {
                      default: () => (
                        <TextRow text={c.pointsRequired} />
                      )
                    },
                    sortOrder: 20
                  },
                  {
                    // eslint-disable-next-line react/no-unstable-nested-components
                    // Aquiiiii
                    component: {
                      default: () => (
                        <TextRow text={c.discountAmount} />
                      )
                    },
                    sortOrder: 20
                  },
                  {
                    // eslint-disable-next-line react/no-unstable-nested-components
                    component: {
                      default: () => <TextRow text={c.startDate?.text || '--'} />
                    },
                    sortOrder: 30
                  },
                  {
                    // eslint-disable-next-line react/no-unstable-nested-components
                    component: {
                      default: () => <TextRow text={c.startDate?.text || '--'} />
                    },
                    sortOrder: 30
                  },
                  {
                    // eslint-disable-next-line react/no-unstable-nested-components
                    component: {
                      
                      default: ({areaProps}) => (
                      
                        <StatusRow
                          title="Status"
                          id="status"
                          areaProps={areaProps}
                        />
                      )
                    },
                    sortOrder: 40
                  }
                ]}
              />
            </tr>
          ))}
        </tbody>
      </table>
      {rewards.length === 0 && (
        <div className="flex w-full justify-center">
          There is no reward to display
        </div>
      )}

      <Pagination
        page={page}
        limit={limit}
        total={rewards.total}
      />
    </Card>

    
    );
};

rewardGrid.propTypes = {
  rewards: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        rewardId: PropTypes.number.isRequired,
        uuid: PropTypes.string.isRequired,
        sellerUserId: PropTypes.number,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        pointsRequired: PropTypes.number.isRequired,
        discountAmount: PropTypes.number.isRequired,
        status: PropTypes.bool.isRequired,
        startDate: PropTypes.string.isRequired, 
        endDate: PropTypes.string.isRequired
      })
    ).isRequired,
    total: PropTypes.number.isRequired,
    currentFilters: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        operation: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    )
  }).isRequired
};


export const layout = {
  areaId: 'content',
  sortOrder: 20
};

export const query = `
  query Query($filters: [FilterInput]) {
    rewards(filters: $filters) {
      items {
        rewardId
        uuid
        sellerUserId
        name
        description
        pointsRequired
        status
        discountAmount
        startDate {
          text
        }
        endDate {
          text
        }
        editUrl
        updateApi
        deleteApi 
      }
      total
      currentFilters {
        key
        operation
        value
      }
    }
  }
`;
export const variables = `
{
  filters: getContextValue('filtersFromUrl')
}`;
