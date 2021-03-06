HHM.config = HHM.config || {};

/**
 * Include your room config here (the object that will be passed to HBInit).
 *
 * If set to false, you will have to call PluginManager#start manually with a
 * room instance to start the plugin system.
 */
HHM.config.room = {
  roomName: `HHM room`,
  playerName : `HHM`,
  maxPlayers: 16,
  //password : `hhm`,
  public : false,
  geo: {code: `FI`, lat: 60.192059, lon: 24.945831},
};

/**
 * This function is executed after the plugin system was loaded and the room has
 * been started.
 *
 * Can be used to set initial room parameters or add custom event handlers.
 */
HHM.config.postInit = HBInit => {
  let room = HBInit();
  room.pluginSpec = {
    dependencies: [
      `saviola/commands`,
      `saviola/cron`,
    ]
  };

  room.setDefaultStadium(`Big`);
  room.setScoreLimit(0);
  room.setTimeLimit(7);

  // Don't print any !admin commands
  room.onCommand_admin = (player, arguments) => {
    return false;
  };

  // Write !admin somepw to get admin in the room, make sure to change this
  room.onCommand_admin_somepw = (player, arguments) => {
    if (arguments.length === 0) {
      room.setPlayerAdmin(player.id, true);
    }

    return false;
  };
};

/**
 * This is the heart of the HHM config: a collection of plugins to load and
 * their corresponding configurations.
 *
 * If you leave this empty, you will have to load plugins through the UI.
 */
HHM.config.plugins = {
  'saviola/commands': {
    commandPrefix: `!`,
  },
  'saviola/cron': {},
};

/**
 * List of plugin repositories.
 *
 * When resolving plugin dependencies, the plugin manager will try to find a
 * JS file with the name of the plugin under each of these URLs. It will load
 * the first one it finds. Must include trailing slash if you want to directly
 * load JS files (as opposed to use a PHP script to serve the plugins, for
 * example).
 *
 * Each entry can either be a URL or an object containing the following
 * properties:
 *
 * - url
 * - suffix: string that will be appended to the plugin name (optional)
 *
 * The default value for suffix is `.js`.
 *
 * Plugins are loaded as text via $.ajax and then executed in a
 * new Function() context that receives a room object. The function can return
 * an object containing the plugin configuration or register itself with the
 * plugin manager. Trickery is employed to make sure calls to HBinit etc. don't
 * break the execution. The repository has to return an error page if the plugin
 * was not found, otherwise dependency resolution will not work properly.
 */
HHM.config.repositories = [
  {
    url: `https://haxplugins.tk/plugins/`,
  },
  {
    url: `https://haxplugins.tk/testing/plugins/`,
  },
];

/**
 * Set this to true to check the HHM config without creating a room.
 *
 * Dependency resolution and execution order will be determined without the need
 * for a real room object. May not work for plugins that require the room to be
 * up at load time.
 *
 * @type {boolean}
 */
HHM.config.dryRun = false;

/**
 * Indicate to HHM and its plugins that you want to run in true headless mode,
 * meaning that any and all optional output to the website will be omitted
 * (logging, forms etc.).
 *
 * @type {boolean}
 */
HHM.config.trueHeadless = false;

/**
 * Overlong messages are automatically split in the HHM sendChat
 * implementation. To avoid (accidental) chat flooding, no message can be
 * longer than this value.
 *
 * By default this limits the output to 20 lines.
 */
HHM.config.sendChatMaxLength = 2686;