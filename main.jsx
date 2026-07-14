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

$render(
  <hstack
    frame="max"
    spacing="14"
    padding="14"
    background={colors.room}
  >
    <zstack frame="150,130" background={colors.backWall} radius="20">
      <vstack spacing="0">
        <roundedrect frame="150,88" color={colors.backWall} radius="20" />
        <roundedrect frame="150,42" color={colors.floor} radius="0" />
      </vstack>

      <vstack spacing="5">
        <roundedrect frame="68,34" color="#092d45" radius="7" />
        <roundedrect frame="46,5" color={colors.monitor} radius="3" />
        <roundedrect frame="96,9" color={colors.desk} radius="4" />
      </vstack>

      <hstack spacing="6">
        <vstack spacing="5">
          <circle frame="58,58" color={colors.friendShadow} />
          <roundedrect frame="70,16" color="#0a1728" radius="8" />
        </vstack>
        <vstack spacing="2">
          <circle frame="12,12" color={colors.lamp} />
          <roundedrect frame="7,42" color="#d89f55" radius="4" />
        </vstack>
      </hstack>

      <vstack spacing="0">
        <circle frame="76,76" color={colors.friend} />
        <roundedrect frame="48,12" color={colors.friendShadow} radius="6" />
      </vstack>

      <vstack spacing="8">
        <hstack spacing="16">
          <circle frame="9,9" color={colors.eye} />
          <circle frame="9,9" color={colors.eye} />
        </hstack>
        <roundedrect frame="24,5" color={colors.eye} radius="3" />
      </vstack>
    </zstack>

    <vstack frame="130,130" spacing="10" padding="12" background={colors.panel} radius="18">
      <text font="caption" color={colors.muted}>DEV FRIENDZ</text>
      <roundedrect frame="56,3" color={colors.accent} radius="2" />
      <text font="title3" color={colors.text}>Ready when you are.</text>
    </vstack>
  </hstack>
);
