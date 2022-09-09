<?php
/* vim: set expandtab sw=4 ts=4 sts=4: */
/**
 * phpMyAdmin sample configuration, you can use it as base for
 * manual configuration. For easier setup you can use setup/
 *
 * All directives are explained in documentation in the doc/ folder
 * or at <https://docs.phpmyadmin.net/>.
 *
 * @package PhpMyAdmin
 */

/**
 * Disable the default warning that is displayed on the DB Details Structure
 * page if any of the required Tables for the relationfeatures could not be
 * found
 *
 * Default: false
 */
/* $cfg['PmaNoRelation_DisableWarning']  = true;

/**
 * Zero Configuration mode.
 *
 * Enables Zero Configuration mode in which the user will be offered a choice
 * to create phpMyAdmin configuration storage in the current database or use
 * the existing one, if already present.
 *
 * Note: If there is no central configuration storage defined then you may end
 * up with different set of phpMyAdmin configuration storage tables for
 * different databases.
 *
 * Default: true
 */
$cfg['ZeroConf'] = false;

/**
 * Disable the default warning that is displayed if Suhosin is detected
 *
 * Default: false
 */
/* $cfg['SuhosinDisableWarning'] = true;

/**
 * Default language to use, if not browser-defined or user-defined
 *
 * Default: en
 */
/* $cfg['DefaultLang'] = 'de';

/**
 * This is needed for cookie based authentication to encrypt password in
 * cookie. Needs to be 32 chars long.
 *
 * YOU MUST FILL IN THIS FOR COOKIE AUTH!
 */
$cfg['blowfish_secret'] = '';

/**
 * Servers configuration
 *
 * for more info/explanation about these VARS have look at
 *  libraries/config.default.php
 */
$i = 0;

/**
 * First server
 */
$i++;

$cfg['Servers'][$i]['host']                     = 'localhost';
$cfg['Servers'][$i]['port']                     = '';
$cfg['Servers'][$i]['socket']                   = '';
$cfg['Servers'][$i]['ssl']                      = false;
$cfg['Servers'][$i]['connect_type']             = 'socket';
$cfg['Servers'][$i]['extension']                = 'mysqli';
$cfg['Servers'][$i]['compress']                 = false;
$cfg['Servers'][$i]['auth_type']                = 'cookie';
$cfg['Servers'][$i]['user']                     = 'root';
$cfg['Servers'][$i]['password']                 = '';
$cfg['Servers'][$i]['AllowNoPassword']          = false;
$cfg['Servers'][$i]['AllowRoot']                = true;
$cfg['Servers'][$i]['SignonSession']            = '';
$cfg['Servers'][$i]['SignonURL']                = '';
$cfg['Servers'][$i]['LogoutURL']                = '';
$cfg['Servers'][$i]['only_db']                  = '';
$cfg['Servers'][$i]['verbose']                  = '';
$cfg['Servers'][$i]['verbose_check']            = true;
$cfg['Servers'][$i]['AllowDeny']['order']       = '';
$cfg['Servers'][$i]['AllowDeny']['rules']       = array();

/**
 * phpMyAdmin configuration storage settings.
 *
 * for more info/explanation about these VARS have look at
 *  libraries/config.default.php
 */

/* User used to manipulate with storage */
$cfg['Servers'][$i]['controlhost'] = 'localhost';
$cfg['Servers'][$i]['controlport'] = '';
/*
$cfg['Servers'][$i]['controluser'] = 'pma';
$cfg['Servers'][$i]['controlpass'] = 'pmapass';

/**
 * The name of the database containing the phpMyAdmin configuration storage.
 *
 * For a whole set of additional features (bookmarks, comments, SQL-history,
 * tracking mechanism, PDF-generation, column contents transformation, etc.)
 * you need to create a set of special tables. Those tables can be located in
 * your own database, or in a central database for a multi-user installation
 * (this database would then be accessed by the controluser, so no other user
 * should have rights to it).
 *
 * Default: ''
 *
 */
/* $cfg['Servers'][$i]['pmadb']                    = 'phpmyadmin';

/* Other Storage tables */

$cfg['Servers'][$i]['bookmarktable']            = 'pma__bookmark';
$cfg['Servers'][$i]['relation']                 = 'pma__relation';
$cfg['Servers'][$i]['table_info']               = 'pma__table_info';
$cfg['Servers'][$i]['table_coords']             = 'pma__table_coords';
$cfg['Servers'][$i]['pdf_pages']                = 'pma__pdf_pages';
$cfg['Servers'][$i]['column_info']              = 'pma__column_info';
$cfg['Servers'][$i]['history']                  = 'pma__history';
$cfg['Servers'][$i]['table_uiprefs']            = 'pma__table_uiprefs';
$cfg['Servers'][$i]['tracking']                 = 'pma__tracking';
$cfg['Servers'][$i]['userconfig']               = 'pma__userconfig';
$cfg['Servers'][$i]['recent']                   = 'pma__recent';
$cfg['Servers'][$i]['favorite']                 = 'pma__favorite';
$cfg['Servers'][$i]['users']                    = 'pma__users';
$cfg['Servers'][$i]['usergroups']               = 'pma__usergroups';
$cfg['Servers'][$i]['navigationhiding']         = 'pma__navigationhiding';
$cfg['Servers'][$i]['savedsearches']            = 'pma__savedsearches';
$cfg['Servers'][$i]['central_columns']          = 'pma__central_columns';
$cfg['Servers'][$i]['designer_settings']        = 'pma__designer_settings';
$cfg['Servers'][$i]['export_templates']         = 'pma__export_templates';
/* $cfg['Servers'][$i]['auth_swekey_config']       = '';



/**
 * Second Server
 */

/*
$i++;
$cfg['Servers'][$i]['host']                     = 'localhost';
$cfg['Servers'][$i]['port']                     = '';
$cfg['Servers'][$i]['socket']                   = '';
$cfg['Servers'][$i]['ssl']                      = false;
$cfg['Servers'][$i]['connect_type']             = 'socket';
$cfg['Servers'][$i]['extension']                = 'mysqli';
$cfg['Servers'][$i]['compress']                 = false;
$cfg['Servers'][$i]['auth_type']                = 'cookie';
$cfg['Servers'][$i]['user']                     = 'root';
$cfg['Servers'][$i]['password']                 = '';
$cfg['Servers'][$i]['AllowNoPassword']          = false;
$cfg['Servers'][$i]['AllowRoot']                = true;
$cfg['Servers'][$i]['SignonSession']            = '';
$cfg['Servers'][$i]['SignonURL']                = '';
$cfg['Servers'][$i]['LogoutURL']                = '';
$cfg['Servers'][$i]['only_db']                  = '';
$cfg['Servers'][$i]['verbose']                  = '';
$cfg['Servers'][$i]['verbose_check']            = true;
$cfg['Servers'][$i]['AllowDeny']['order']       = '';
$cfg['Servers'][$i]['AllowDeny']['rules']       = array();
*/

/*
 * phpMyAdmin configuration storage settings.
 */

/*
$cfg['Servers'][$i]['controlhost']              = 'localhost';
$cfg['Servers'][$i]['controlport']              = '';
$cfg['Servers'][$i]['controluser']              = 'pma';
$cfg['Servers'][$i]['controlpass']              = 'pmapass';
$cfg['Servers'][$i]['pmadb']                    = 'phpmyadmin';
$cfg['Servers'][$i]['bookmarktable']            = 'pma__bookmark';
$cfg['Servers'][$i]['relation']                 = 'pma__relation';
$cfg['Servers'][$i]['table_info']               = 'pma__table_info';
$cfg['Servers'][$i]['table_coords']             = 'pma__table_cords';
$cfg['Servers'][$i]['pdf_pages']                = 'pma__pdf_pages';
$cfg['Servers'][$i]['column_info']              = 'pma__column_info';
$cfg['Servers'][$i]['history']                  = 'pma__history';
$cfg['Servers'][$i]['table_uiprefs']            = 'pma__table_uiprefs';
$cfg['Servers'][$i]['tracking']                 = 'pma__tracking';
$cfg['Servers'][$i]['userconfig']               = 'pma__userconfig';
$cfg['Servers'][$i]['recent']                   = 'pma__recent';
$cfg['Servers'][$i]['users']                    = 'pma__users';
$cfg['Servers'][$i]['usergroups']               = 'pma__usergroups';
$cfg['Servers'][$i]['navigationhiding']         = 'pma__navigationhiding';
$cfg['Servers'][$i]['savedsearches']            = 'pma__savedsearches';
$cfg['Servers'][$i]['central_columns']          = 'pma__central_columns';
$cfg['Servers'][$i]['designer_settings']        = 'pma__designer_settings';
$cfg['Servers'][$i]['export_templates']         = 'pma__export_templates';
*/

/**
 * If you have more than one server configured, you can set $cfg['ServerDefault']
 * to any one of them to autoconnect to that server when phpMyAdmin is started,
 * or set it to 0 to be given a list of servers without logging in
 * If you have only one server configured, $cfg['ServerDefault'] *MUST* be
 * set to that server.
 *
 * Default server (0 = no default server)
 */
$cfg['ServerDefault']       = 1;
$cfg['Server']              = '0';
unset($cfg['Servers'][0]);

/**
 * End of servers configuration
 */

/**
 * Directories for saving/loading files from server
 */
$cfg['UploadDir'] = '';
$cfg['SaveDir'] = '';

/**
 * Whether to display icons or text or both icons and text in table row
 * action segment. Value can be either of 'icons', 'text' or 'both'.
 * default = 'both'
 */
//$cfg['RowActionType'] = 'icons';

/**
 * Defines whether a user should be displayed a "show all (records)"
 * button in browse mode or not.
 * default = false
 */
//$cfg['ShowAll'] = true;

/**
 * Number of rows displayed when browsing a result set. If the result
 * set contains more rows, "Previous" and "Next".
 * Possible values: 25, 50, 100, 250, 500
 * default = 25
 */
//$cfg['MaxRows'] = 50;

/**
 * Disallow editing of binary fields
 * valid values are:
 *   false    allow editing
 *   'blob'   allow editing except for BLOB fields
 *   'noblob' disallow editing except for BLOB fields
 *   'all'    disallow editing
 * default = 'blob'
 */
//$cfg['ProtectBinary'] = false;

/**
 * Default language to use, if not browser-defined or user-defined
 * (you find all languages in the locale folder)
 * uncomment the desired line:
 * default = 'en'
 */
//$cfg['DefaultLang'] = 'en';
//$cfg['DefaultLang'] = 'de';

/**
 * How many columns should be used for table display of a database?
 * (a value larger than 1 results in some information being hidden)
 * default = 1
 */
//$cfg['PropertiesNumColumns'] = 2;

/**
 * Set to true if you want DB-based query history.If false, this utilizes
 * JS-routines to display query history (lost by window close)
 *
 * This requires configuration storage enabled, see above.
 * default = false
 */
//$cfg['QueryHistoryDB'] = true;

/**
 * When using DB-based query history, how many entries should be kept?
 * default = 25
 */
//$cfg['QueryHistoryMax'] = 100;

/**
 * Whether or not to query the user before sending the error report to
 * the phpMyAdmin team when a JavaScript error occurs
 *
 * Available options
 * ('ask' | 'always' | 'never')
 * default = 'ask'
 */
//$cfg['SendErrorReports'] = 'always';

/**
 * 'URLQueryEncryption' defines whether phpMyAdmin will encrypt sensitive data from the URL query string.
 * 'URLQueryEncryptionSecretKey' is a 32 bytes long secret key used to encrypt/decrypt the URL query string.
 */
//$cfg['URLQueryEncryption'] = true;
//$cfg['URLQueryEncryptionSecretKey'] = '';

/**
 * You can find more configuration options in the documentation
 * in the doc/ folder or at <https://docs.phpmyadmin.net/>.
 */
