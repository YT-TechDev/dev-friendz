const CONFIG = {
  schedule: {
    morningStartHour: 6,
    codingStartHour: 10,
    sleepingStartHour: 22
  }
};

const DEV_OVERRIDE_STATE = null;
// Temporary validation values: "morning", "coding", "sleeping"

const DEFAULT_SCHEDULE = {
  morningStartHour: 6,
  codingStartHour: 10,
  sleepingStartHour: 22
};

const colors = {
  room: "#071426",
  backWall: "#0b1f35",
  floor: "#10243a",
  desk: "#8a5a3b",
  monitor: "#8ff7e8",
  lamp: "#f6c977",
  friend: "#58d6c9",
  friendShadow: "#1f6f77",
  eye: "#071426",
  panel: "#10243a",
  text: "#e6fbff",
  muted: "#75a7b8",
  accent: "#7fffd4"
};

const FRIEND_STATES = {
  MORNING: "morning",
  CODING: "coding",
  SLEEPING: "sleeping"
};

const FRIEND_MOMENTS = {
  WAKING: "waking",
  GENTLE_START: "gentle_start",
  FOCUSED: "focused",
  QUIET_BREAK: "quiet_break",
  WINDING_DOWN: "winding_down",
  DEEP_REST: "deep_rest"
};

const FRIEND_MOMENT_POOLS = {
  [FRIEND_STATES.MORNING]: [
    FRIEND_MOMENTS.WAKING,
    FRIEND_MOMENTS.GENTLE_START
  ],
  [FRIEND_STATES.CODING]: [
    FRIEND_MOMENTS.FOCUSED,
    FRIEND_MOMENTS.QUIET_BREAK
  ],
  [FRIEND_STATES.SLEEPING]: [
    FRIEND_MOMENTS.DEEP_REST,
    FRIEND_MOMENTS.WINDING_DOWN
  ]
};

const FRIEND_MOMENT_STATE_OFFSETS = {
  [FRIEND_STATES.MORNING]: 0,
  [FRIEND_STATES.CODING]: 1,
  [FRIEND_STATES.SLEEPING]: 2
};

function getRawTimeSignal() {
  return new Date();
}

function normalizeTimeSignal(rawSignal) {
  const year = rawSignal.getFullYear();
  const month = rawSignal.getMonth() + 1;
  const day = rawSignal.getDate();

  return {
    hour: rawSignal.getHours(),
    localDateKey: year * 10000 + month * 100 + day
  };
}

function normalizeSchedule(rawSchedule) {
  if (
    !rawSchedule ||
    typeof rawSchedule !== "object" ||
    Array.isArray(rawSchedule)
  ) {
    return { ...DEFAULT_SCHEDULE };
  }

  const {
    morningStartHour,
    codingStartHour,
    sleepingStartHour
  } = rawSchedule;

  const values = [
    morningStartHour,
    codingStartHour,
    sleepingStartHour
  ];

  const hasValidHours = values.every(
    (value) =>
      typeof value === "number" &&
      Number.isInteger(value) &&
      value >= 0 &&
      value <= 23
  );

  const isAscending =
    morningStartHour < codingStartHour &&
    codingStartHour < sleepingStartHour;

  if (!hasValidHours || !isAscending) {
    return { ...DEFAULT_SCHEDULE };
  }

  return {
    morningStartHour,
    codingStartHour,
    sleepingStartHour
  };
}

function normalizeConfig(rawConfig) {
  const rawSchedule =
    rawConfig &&
    typeof rawConfig === "object" &&
    !Array.isArray(rawConfig)
      ? rawConfig.schedule
      : undefined;

  return {
    schedule: normalizeSchedule(rawSchedule)
  };
}

function deriveFriendState(timeSignal, schedule) {
  if (
    timeSignal.hour >= schedule.morningStartHour &&
    timeSignal.hour < schedule.codingStartHour
  ) {
    return FRIEND_STATES.MORNING;
  }

  if (
    timeSignal.hour >= schedule.codingStartHour &&
    timeSignal.hour < schedule.sleepingStartHour
  ) {
    return FRIEND_STATES.CODING;
  }

  return FRIEND_STATES.SLEEPING;
}

function resolveEffectiveFriendState(derivedState, overrideState) {
  if (
    overrideState === FRIEND_STATES.MORNING ||
    overrideState === FRIEND_STATES.CODING ||
    overrideState === FRIEND_STATES.SLEEPING
  ) {
    return overrideState;
  }

  return derivedState;
}

const VISUAL_MOMENTS = {
  [FRIEND_MOMENTS.WAKING]: {
    room: {
      backWallColor: "#12304d",
      floorColor: "#16384f"
    },
    monitor: {
      screenColor: "#0d3045",
      glowFrame: "24,3",
      glowColor: "#78bdb9"
    },
    lamp: {
      bulbFrame: "12,12",
      bulbColor: "#f2c979",
      standColor: "#c89150"
    },
    friend: {
      bodyFrame: "68,62",
      bodyRadius: "31",
      bodyColor: colors.friend,
      shadowFrame: "46,9",
      shadowColor: colors.friendShadow,
      baseFrame: "62,12",
      baseColor: "#0a1728"
    },
    face: {
      eyeFrame: "9,6",
      eyeRadius: "3",
      eyeSpacing: "14",
      mouthFrame: "18,3",
      mouthRadius: "2"
    }
  },
  [FRIEND_MOMENTS.GENTLE_START]: {
    room: {
      backWallColor: "#143454",
      floorColor: "#183d58"
    },
    monitor: {
      screenColor: "#0f3a51",
      glowFrame: "36,4",
      glowColor: "#8fd8d0"
    },
    lamp: {
      bulbFrame: "14,14",
      bulbColor: "#ffd98a",
      standColor: "#d89f55"
    },
    friend: {
      bodyFrame: "66,68",
      bodyRadius: "33",
      bodyColor: colors.friend,
      shadowFrame: "44,10",
      shadowColor: colors.friendShadow,
      baseFrame: "60,12",
      baseColor: "#0a1728"
    },
    face: {
      eyeFrame: "8,10",
      eyeRadius: "4",
      eyeSpacing: "15",
      mouthFrame: "20,4",
      mouthRadius: "2"
    }
  },
  [FRIEND_MOMENTS.FOCUSED]: {
    room: {
      backWallColor: colors.backWall,
      floorColor: colors.floor
    },
    monitor: {
      screenColor: "#0a3958",
      glowFrame: "54,7",
      glowColor: colors.monitor
    },
    lamp: {
      bulbFrame: "10,10",
      bulbColor: colors.lamp,
      standColor: "#d89f55"
    },
    friend: {
      bodyFrame: "64,70",
      bodyRadius: "31",
      bodyColor: colors.friend,
      shadowFrame: "46,9",
      shadowColor: colors.friendShadow,
      baseFrame: "62,13",
      baseColor: "#0a1728"
    },
    face: {
      eyeFrame: "10,6",
      eyeRadius: "3",
      eyeSpacing: "12",
      mouthFrame: "18,4",
      mouthRadius: "2"
    }
  },
  [FRIEND_MOMENTS.QUIET_BREAK]: {
    room: {
      backWallColor: colors.backWall,
      floorColor: colors.floor
    },
    monitor: {
      screenColor: "#0a3049",
      glowFrame: "34,4",
      glowColor: "#72cfc4"
    },
    lamp: {
      bulbFrame: "11,11",
      bulbColor: "#e8bd70",
      standColor: "#c89150"
    },
    friend: {
      bodyFrame: "68,64",
      bodyRadius: "30",
      bodyColor: colors.friend,
      shadowFrame: "48,9",
      shadowColor: colors.friendShadow,
      baseFrame: "64,12",
      baseColor: "#0a1728"
    },
    face: {
      eyeFrame: "8,8",
      eyeRadius: "4",
      eyeSpacing: "14",
      mouthFrame: "22,3",
      mouthRadius: "2"
    }
  },
  [FRIEND_MOMENTS.WINDING_DOWN]: {
    room: {
      backWallColor: "#0a1d32",
      floorColor: "#10263a"
    },
    monitor: {
      screenColor: "#082438",
      glowFrame: "20,3",
      glowColor: "#557f87"
    },
    lamp: {
      bulbFrame: "9,9",
      bulbColor: "#a58b62",
      standColor: "#80694f"
    },
    friend: {
      bodyFrame: "72,56",
      bodyRadius: "26",
      bodyColor: "#51c2bb",
      shadowFrame: "52,8",
      shadowColor: "#1c626b",
      baseFrame: "68,11",
      baseColor: "#081323"
    },
    face: {
      eyeFrame: "10,5",
      eyeRadius: "3",
      eyeSpacing: "13",
      mouthFrame: "16,3",
      mouthRadius: "2"
    }
  },
  [FRIEND_MOMENTS.DEEP_REST]: {
    room: {
      backWallColor: "#08172a",
      floorColor: "#0b1d32"
    },
    monitor: {
      screenColor: "#071d2f",
      glowFrame: "28,3",
      glowColor: "#406f7a"
    },
    lamp: {
      bulbFrame: "8,8",
      bulbColor: "#8e7857",
      standColor: "#765f47"
    },
    friend: {
      bodyFrame: "78,48",
      bodyRadius: "24",
      bodyColor: "#4db9b4",
      shadowFrame: "58,8",
      shadowColor: "#1a5661",
      baseFrame: "72,11",
      baseColor: "#081323"
    },
    face: {
      eyeFrame: "12,3",
      eyeRadius: "2",
      eyeSpacing: "12",
      mouthFrame: "16,3",
      mouthRadius: "2"
    }
  }
};

const DIALOGUE_POOLS = {
  [FRIEND_STATES.MORNING]: [
    "Morning. Take it easy.",
    "A gentle start."
  ],
  [FRIEND_STATES.CODING]: [
    "I'll keep you company.",
    "One step at a time."
  ],
  [FRIEND_STATES.SLEEPING]: [
    "Good work. Time to rest.",
    "The room can wait."
  ]
};

const DIALOGUE_STATE_OFFSETS = {
  [FRIEND_STATES.MORNING]: 0,
  [FRIEND_STATES.CODING]: 1,
  [FRIEND_STATES.SLEEPING]: 2
};

function deriveFriendMoment(friendState, localDateKey) {
  const pool = FRIEND_MOMENT_POOLS[friendState];

  if (!pool) {
    return FRIEND_MOMENTS.DEEP_REST;
  }

  const offset = FRIEND_MOMENT_STATE_OFFSETS[friendState];
  const index = (localDateKey + offset) % pool.length;

  return pool[index];
}

function deriveDialogue(friendState, localDateKey) {
  const effectiveState = DIALOGUE_POOLS[friendState]
    ? friendState
    : FRIEND_STATES.SLEEPING;
  const pool = DIALOGUE_POOLS[effectiveState];
  const offset = DIALOGUE_STATE_OFFSETS[effectiveState];
  const index = (localDateKey + offset) % pool.length;

  return pool[index];
}

function derivePresentation(friendState, friendMoment, dialogue) {
  const visual =
    VISUAL_MOMENTS[friendMoment] ||
    VISUAL_MOMENTS[FRIEND_MOMENTS.DEEP_REST];

  return {
    friendState,
    friendMoment,
    dialogue,
    visual
  };
}

const config = normalizeConfig(CONFIG);
const rawTimeSignal = getRawTimeSignal();
const timeSignal = normalizeTimeSignal(rawTimeSignal);
const derivedFriendState = deriveFriendState(
  timeSignal,
  config.schedule
);
const effectiveFriendState = resolveEffectiveFriendState(
  derivedFriendState,
  DEV_OVERRIDE_STATE
);
const derivedFriendMoment = deriveFriendMoment(
  effectiveFriendState,
  timeSignal.localDateKey
);
const dialogue = deriveDialogue(
  effectiveFriendState,
  timeSignal.localDateKey
);
const presentation = derivePresentation(
  effectiveFriendState,
  derivedFriendMoment,
  dialogue
);

$render(
  <hstack
    frame="300,140"
    spacing="8"
    background={colors.room}
  >
    <zstack frame="150,120" background={colors.backWall} radius="18">
      <vstack spacing="0">
        <roundedrect frame="150,82" color={presentation.visual.room.backWallColor} radius="18" />
        <roundedrect frame="150,38" color={presentation.visual.room.floorColor} radius="0" />
      </vstack>

      <vstack spacing="4">
        <roundedrect frame="64,30" color={presentation.visual.monitor.screenColor} radius="7" />
        <roundedrect frame={presentation.visual.monitor.glowFrame} color={presentation.visual.monitor.glowColor} radius="3" />
        <roundedrect frame="90,8" color={colors.desk} radius="4" />
      </vstack>

      <hstack spacing="5">
        <vstack spacing="4">
          <roundedrect frame={presentation.visual.friend.shadowFrame} color={presentation.visual.friend.shadowColor} radius="5" />
          <roundedrect frame={presentation.visual.friend.baseFrame} color={presentation.visual.friend.baseColor} radius="7" />
        </vstack>
        <vstack spacing="2">
          <circle frame={presentation.visual.lamp.bulbFrame} color={presentation.visual.lamp.bulbColor} />
          <roundedrect frame="6,36" color={presentation.visual.lamp.standColor} radius="3" />
        </vstack>
      </hstack>

      <vstack spacing="0">
        <roundedrect frame={presentation.visual.friend.bodyFrame} color={presentation.visual.friend.bodyColor} radius={presentation.visual.friend.bodyRadius} />
        <roundedrect frame={presentation.visual.friend.shadowFrame} color={presentation.visual.friend.shadowColor} radius="5" />
      </vstack>

      <vstack spacing="7">
        <hstack spacing={presentation.visual.face.eyeSpacing}>
          <roundedrect frame={presentation.visual.face.eyeFrame} color={colors.eye} radius={presentation.visual.face.eyeRadius} />
          <roundedrect frame={presentation.visual.face.eyeFrame} color={colors.eye} radius={presentation.visual.face.eyeRadius} />
        </hstack>
        <roundedrect frame={presentation.visual.face.mouthFrame} color={colors.eye} radius={presentation.visual.face.mouthRadius} />
      </vstack>
    </zstack>

    <zstack frame="120,120" background={colors.panel} radius="16">
      <vstack spacing="8">
        <text font="caption" color={colors.muted}>DEV FRIENDZ</text>
        <roundedrect frame="48,3" color={colors.accent} radius="2" />
        <text font="headline" color={colors.text}>{presentation.dialogue}</text>
      </vstack>
    </zstack>
  </hstack>
);
