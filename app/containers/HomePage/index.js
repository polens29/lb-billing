/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';
import { Modal, Col, Progress, Result, Card} from 'antd';
import FreshdeskWidget from '@personare/react-freshdesk-widget';
import Billing from 'components/Billing';

import ContactTable from 'components/ContactTable';

import {
  makeSelectLBLists,
  makeSelectProgressBar,
  makeSelectProgress,
  makeSelectTotalContact,
  makeSelectListName,
  makeSelectUpdatedLBLists,
  makeSelectAddLbListsLoading,
} from 'containers/Lists/selectors';

import {
  getlbLists,
  createlbLists,
  addTolbLists,
  filterList,
  deleteList,
  copyList,
  renameList,
  removeFromlbLists,
  purchaseList
} from 'containers/Lists/actions';

import { makeSelectSavedSearches } from 'containers/SavedSearch/selectors';
import {
  getSavedSearches,
  createSavedSearch,
  renameSavedSearch,
  deleteSavedSearch,
  copySavedSearch,
  updateSavedSearch,
} from 'containers/SavedSearch/actions';

import {
  makeSelectCredits,
  makeSelectDisplayColumns,
} from 'containers/App/selectors';
import { setColumnDisplay, toggleSidebarDisplay } from 'containers/App/actions';

import {
  fetchLists,
  updateSelectedRows,
  selectAllLeadResults,
  toggleFavorites,
  removeKeywords,
  updateSearchParams,
  specialFilters,
  unlockContact,
  unlockContacts,
  reportContacts,
  addKeywords,
  clearKeywords,
  deleteContacts,
  updateFromRouterState,
  getSearchSuggestions,
  getTagsSuggestions,
  getFilters,
  setSystemFilter,
  selectCategories,
  getExportToCsvCount,
  exportDataThirdParty,
  getCampaigns,
  getCreditCost,
  suppressCompanyContacts,
  emptySelectedRows,
} from './actions';

import {
  makeSelectList,
  makeSelectKeywords,
  makeSelectSearchParams,
  makeSelectCategories,
  makeSelectFetching,
  makeSelectTableColumns,
  makeSelectActiveSpecialFilter,
  makeSelectSearchValue,
  makeSelectTotal,
  makeSelectAggregations,
  makeSelectSearchSuggestions,
  makeSelectTagsSuggestions,
  makeSelectGetLocations,
  makeSelectGetIndustries,
  makeSelectGetSeniority,
  makeSelectGetDepartments,
  makeSelectGetPopularList,
  makeSelectGetRegions,
  makeSelectRowKeys,
  makeSelectAllLeads,
  makeSelectGetLocationsHierarchy,
  makeSelectRows,
  makeSelectExportToCsvCount,
  makeSelectCsvUrl,
  makeSelectIsListSelected,
  makeSelectCampaigns,
  makeSelectCreditCost,
  makeSelectGetTechnologies,
  makeSelectGetTechnologiesHierarchy,
  makeSelectErrorMsg,
  makeSelectSuppressAllCompanyContacts,
  makeSelectProgressBarUnlock,
  makeSelectProgressUnlcok,
  makeSelectTotalContactUnlock,
  makeSelectTotalToUnlock
} from './selectors';

import { makeSelectCredentials, makeSelectUserProfile } from 'containers/App/selectors';
import { getCredentials, getUserProfile } from 'containers/App/actions';

const { Meta } = Card;
export class HomePage extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  static contextTypes = {
    router: PropTypes.object,
  };

  constructor(props) {
    super(props);
    const leadType = this.props.category === 'Organization' ? 'company' : 'contact';
    this.state = {
      campaignParams: {
        status: '',
        query: '',
        page: 1,
        pageSize: 50,
      },
      savedSearchParams: {
        leadType,
        query: '',
        page: 1,
        pageSize: 20,
      },
      visible: false,
      showFreshDesk: false,
      visibleSize: false,
      selectedRows: [],
      showListsModal: false,
      checkedKeys: [],
      listUpdated: false,
      listCreated: false,
      showMap: true

    };
  }

  render() {

    return (
      <div>
        <Billing />
      </div>
    );
  }
}

HomePage.propTypes = {
  getCredentials: PropTypes.func,
  credentials: PropTypes.object,
  searchParams: PropTypes.object,
  params: PropTypes.object,
  updateSelectedRows: PropTypes.func,
  getList: PropTypes.func,
  updateRouterState: PropTypes.func,
  category: PropTypes.string,
  getSearchFilters: PropTypes.func,
  getlbLists: PropTypes.func,
  getCampaigns: PropTypes.func,
  errorMsg: PropTypes.string,
  getSavedSearches: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  credentials: makeSelectCredentials(),
  list: makeSelectList(),
  keywords: makeSelectKeywords(),
  searchParams: makeSelectSearchParams(),
  category: makeSelectCategories(),
  loading: makeSelectFetching(),
  tableColumns: makeSelectTableColumns(),
  activeSpecialFilter: makeSelectActiveSpecialFilter(),
  searchValue: makeSelectSearchValue(),
  total: makeSelectTotal(),
  credits: makeSelectCredits(),
  aggregations: makeSelectAggregations(),
  suggestions: makeSelectSearchSuggestions(),
  tagsSuggestions: makeSelectTagsSuggestions(),
  locations: makeSelectGetLocations(),
  locationsHierarchy: makeSelectGetLocationsHierarchy(),
  technologies: makeSelectGetTechnologies(),
  technologiesHierarchy: makeSelectGetTechnologiesHierarchy(),
  industries: makeSelectGetIndustries(),
  lbLists: makeSelectLBLists(),
  updatedList: makeSelectUpdatedLBLists(),
  departments: makeSelectGetDepartments(),
  seniority: makeSelectGetSeniority(),
  popularList: makeSelectGetPopularList(),
  regions: makeSelectGetRegions(),
  selectedRowKeys: makeSelectRowKeys(),
  displayColumns: makeSelectDisplayColumns(),
  selectAllLeads: makeSelectAllLeads(),
  selectedRows: makeSelectRows(),
  exportToCsvCount: makeSelectExportToCsvCount(),
  csvUrl: makeSelectCsvUrl(),
  isListSelected: makeSelectIsListSelected(),
  campaigns: makeSelectCampaigns(),
  creditCost: makeSelectCreditCost(),
  totalToUnlock: makeSelectTotalToUnlock(),
  errorMsg: makeSelectErrorMsg(),
  savedSearches: makeSelectSavedSearches(),
  suppressAllCompanyContacts: makeSelectSuppressAllCompanyContacts(),
  progressBar: makeSelectProgressBar(),
  progress: makeSelectProgress(),
  totalContact: makeSelectTotalContact(),
  listName: makeSelectListName(),
  progressBarUnlock: makeSelectProgressBarUnlock(),
  progressUnlcok: makeSelectProgressUnlcok(),
  totalContactUnlock: makeSelectTotalContactUnlock(),
  addLbListsLoading: makeSelectAddLbListsLoading(),
  userProfile: makeSelectUserProfile(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getCredentials: () => dispatch(getCredentials()),

    /* List Building---------------------------------------- */
    getlbLists: (category) => dispatch(getlbLists(category)),
    createlbLists: (name, category) => dispatch(createlbLists(name, category)),
    filterList: (query) => dispatch(filterList(query)),
    deleteList: (list) => dispatch(deleteList(list)),
    copyList: (list, index) => dispatch(copyList(list, index)),
    renameList: (list, newName, index) =>
      dispatch(renameList(list, newName, index)),
    addTolbLists: (leads, category, lbLists, filters, addAll, total) =>
      dispatch(addTolbLists(leads, category, lbLists, filters, addAll, total)),

    removeFromlbLists: (leads, category, lbLists, filters, addAll, total) =>
      dispatch(
        removeFromlbLists(leads, category, lbLists, filters, addAll, total)
      ),

    purchaselbLists: (payload) => dispatch(purchaseList(payload)),
    /* ----------------------------------------------------- */

    getList: (params, category) => dispatch(fetchLists(params, category)),

    /* Filters--------------------------------------------- */
    removeKeyword: (list, searchParams) =>
      dispatch(removeKeywords(list, searchParams)),
    updateSearchParams: (key, value) =>
      dispatch(updateSearchParams(key, value)),
    specialFilter: (category, activeSpecialFilter) =>
      dispatch(specialFilters(category, activeSpecialFilter)),
    clearKeyword: (typeOfKeyword, all) =>
      dispatch(clearKeywords(typeOfKeyword, all)),
    getSearchFilters: () => dispatch(getFilters()),
    setSystemFilter: (filter) => dispatch(setSystemFilter(filter)),
    /* ----------------------------------------------------- */

    unlockContact: (contact, params) => {
      const { searchParams, category, unlockCall, showInfoModal } = params;
      return dispatch(
        unlockContact(
          contact,
          searchParams,
          category,
          unlockCall,
          showInfoModal
        )
      );
    },
    unlockContacts: (contacts, params) => {
      const {
        searchParams,
        category,
        unlockAll,
        unlockCall,
        total,
        showInfoModal,
      } = params;

      const getLockedContacts = contacts.filter((contact) => !contact.unlocked);

      return dispatch(
        unlockContacts(
          getLockedContacts,
          searchParams,
          category,
          unlockAll,
          unlockCall,
          total,
          showInfoModal
        )
      );
    },
    reportContacts: (leadIds, checkedList, reportDescription) =>
      dispatch(reportContacts(leadIds, checkedList, reportDescription)),

    updateSelectedRows: (selectedRowKeys, selectedRows) =>
      dispatch(updateSelectedRows(selectedRowKeys, selectedRows)),

    selectAllLeadFunc: (value) => dispatch(selectAllLeadResults(value)),
    addKeyword: (keyword) => dispatch(addKeywords(keyword)),

    suppressCompanyContacts: (value) => dispatch(suppressCompanyContacts(value)),

    deleteContacts: (
      selectedRows,
      category,
      searchParams,
      fromDeepView,
      request,
      suppressAllCompanyContacts
    ) =>
      dispatch(
        deleteContacts(
          selectedRows,
          category,
          searchParams,
          fromDeepView,
          request,
          suppressAllCompanyContacts
        )
      ),
    updateRouterState: (
      searchParams,
      category,
      keywords,
      organizationID,
      activeSpecialFilter
    ) =>
      dispatch(
        updateFromRouterState(
          searchParams,
          category,
          keywords,
          organizationID,
          activeSpecialFilter
        )
      ),
    fetchSearchSuggestions: (query, leadType) =>
      dispatch(getSearchSuggestions(query, leadType)),

    fetchTagsSuggestions: (query, leadType) =>
      dispatch(getTagsSuggestions(query, leadType)),

    toggleFavorites: (lead, category, activeSpecialFilter, searchParams) =>
      dispatch(
        toggleFavorites(lead, category, activeSpecialFilter, searchParams)
      ),

    selectCategory: (category) => dispatch(selectCategories(category)),

    getExportToCsvCount: (category, searchParams, exportAll, selectedRows) =>
      dispatch(
        getExportToCsvCount(category, searchParams, exportAll, selectedRows)
      ),
    setColumns: (category, columns, modalEdit, email) =>
      dispatch(setColumnDisplay(category, columns, modalEdit, email)),
    exportData: (selectedRows, category, filters, selectAllLeads, apiCall) =>
      dispatch(
        exportDataThirdParty(
          selectedRows,
          category,
          filters,
          selectAllLeads,
          apiCall
        )
      ),
    getCampaigns: (status, query, page, pageSize) => {
      dispatch(getCampaigns(status, query, page, pageSize));
    },
    getCreditCost: () => {
      dispatch(getCreditCost());
    },
    getSavedSearches: (leadType, query, page, pageSize) => {
      dispatch(getSavedSearches(leadType, query, page, pageSize));
    },
    createSavedSearch: (name, category, filters, keywords) => {
      dispatch(createSavedSearch(name, category, filters, keywords));
    },
    renameSavedSearch: (savedSearch, newName, index) => {
      dispatch(renameSavedSearch(savedSearch, newName, index));
    },
    deleteSavedSearch: (savedSearch) => {
      dispatch(deleteSavedSearch(savedSearch));
    },
    copySavedSearch: (savedSearch, index) => {
      dispatch(copySavedSearch(savedSearch, index));
    },
    updateSavedSearch: (savedSearch, filters, keywords) => {
      dispatch(updateSavedSearch(savedSearch, filters, keywords));
    },
    toggleSidebarDisplay: (display) => {
      dispatch(toggleSidebarDisplay(display));
    },
    emptySelectedRows: () => dispatch(emptySelectedRows()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
