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

function deriveFriendState(timeSignal) {
  if (timeSignal.hour >= 6 && timeSignal.hour < 10) {
    return FRIEND_STATES.MORNING;
  }

  if (timeSignal.hour >= 10 && timeSignal.hour < 22) {
    return FRIEND_STATES.CODING;
  }

  return FRIEND_STATES.SLEEPING;
}

const VISUAL_STATES = {
  [FRIEND_STATES.MORNING]: {
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
  [FRIEND_STATES.CODING]: {
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
  [FRIEND_STATES.SLEEPING]: {
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

function deriveDialogue(friendState, localDateKey) {
  const effectiveState = DIALOGUE_POOLS[friendState]
    ? friendState
    : FRIEND_STATES.SLEEPING;
  const pool = DIALOGUE_POOLS[effectiveState];
  const offset = DIALOGUE_STATE_OFFSETS[effectiveState];
  const index = (localDateKey + offset) % pool.length;

  return pool[index];
}

function derivePresentation(friendState, dialogue) {
  const visual = VISUAL_STATES[friendState] || VISUAL_STATES[FRIEND_STATES.SLEEPING];

  return {
    friendState,
    dialogue,
    visual
  };
}

const rawTimeSignal = getRawTimeSignal();
const timeSignal = normalizeTimeSignal(rawTimeSignal);
const friendState = deriveFriendState(timeSignal);
const dialogue = deriveDialogue(friendState, timeSignal.localDateKey);
const presentation = derivePresentation(friendState, dialogue);

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
