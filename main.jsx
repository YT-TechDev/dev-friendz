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
    frame="300,140"
    spacing="8"
    background={colors.room}
  >
    <zstack frame="150,120" background={colors.backWall} radius="18">
      <vstack spacing="0">
        <roundedrect frame="150,82" color={colors.backWall} radius="18" />
        <roundedrect frame="150,38" color={colors.floor} radius="0" />
      </vstack>

      <vstack spacing="4">
        <roundedrect frame="64,30" color="#092d45" radius="7" />
        <roundedrect frame="42,5" color={colors.monitor} radius="3" />
        <roundedrect frame="90,8" color={colors.desk} radius="4" />
      </vstack>

      <hstack spacing="5">
        <vstack spacing="4">
          <circle frame="52,52" color={colors.friendShadow} />
          <roundedrect frame="62,13" color="#0a1728" radius="7" />
        </vstack>
        <vstack spacing="2">
          <circle frame="10,10" color={colors.lamp} />
          <roundedrect frame="6,36" color="#d89f55" radius="3" />
        </vstack>
      </hstack>

      <vstack spacing="0">
        <circle frame="68,68" color={colors.friend} />
        <roundedrect frame="44,10" color={colors.friendShadow} radius="5" />
      </vstack>

      <vstack spacing="7">
        <hstack spacing="14">
          <circle frame="8,8" color={colors.eye} />
          <circle frame="8,8" color={colors.eye} />
        </hstack>
        <roundedrect frame="20,4" color={colors.eye} radius="2" />
      </vstack>
    </zstack>

    <zstack frame="120,120" background={colors.panel} radius="16">
      <vstack spacing="8">
        <text font="caption" color={colors.muted}>DEV FRIENDZ</text>
        <roundedrect frame="48,3" color={colors.accent} radius="2" />
        <text font="headline" color={colors.text}>Ready when you are.</text>
      </vstack>
    </zstack>
  </hstack>
);
