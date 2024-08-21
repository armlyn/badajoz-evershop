const {
  buildFilterFromUrl
} = require('@evershop/evershop/src/lib/util/buildFilterFromUrl');
// const {
//   setContextValue
// } = require('@graphql/services/contextHelper');
const {
  setContextValue
} = require('../../../../graphql/services/contextHelper');

module.exports = (request) => {
  setContextValue(request, 'pageInfo', {
    title: 'Rewards',
    description: 'Rewards'
  });
  setContextValue(request, 'filtersFromUrl', buildFilterFromUrl(request));
};
