
export const getSearch = ({ search }) => search;
export const getUsers = ({ users }) => users;
export const getUser = ({ user }) => user;
export const getHeaderUsres = ({ headerUsres }) => headerUsres;
export const getUrlUserRepos = ({ user }) => user.repos_url? user.repos_url : null;
export const getUrlUserFollowers = ({ user }) => user.followers_url? user.followers_url : null;
export const getUrlUserOrganizations = ({ user }) => user.organizations_url? user.organizations_url : null;


