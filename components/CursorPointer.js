import { useState, useEffect } from 'react';
import { useOthers, useMyPresence } from '../liveblocks.config';
import Cursor from './Cursor';

const COLORS = ['#0EA293', '#576CBC', '#19A7CE'];

export default function CursorPointer() {
  const [{ cursor }, updateMyPresence] = useMyPresence();
  const users = useOthers();
  const [privateId, setPrivateId] = useState(0);

  useEffect(() => {
    setPrivateId(Math.floor(Math.random() * 100000));
  }, []);

  return (
    <a
      href="#about"
      className="absolute w-screen h-[95vh] z-[1] cursor-pointer"
      onPointerMove={(event) => {
        event.preventDefault();
        updateMyPresence({
          cursor: {
            x: Math.round(event.clientX),
            y: Math.round(event.clientY),
          },
        });
      }}
      onPointerLeave={() => updateMyPresence({ cursor: null })}
    >
      {users.map(({ connectionId, presence }) => {
        if (presence.cursor === null) {
          return null;
        }
        return (
          <Cursor
            key={`cursor-${connectionId}`}
            id={connectionId * privateId}
            color={COLORS[connectionId % COLORS.length]}
            x={presence.cursor.x}
            y={presence.cursor.y}
          />
        );
      })}
    </a>
  );
}
