//
//  PuzzleWidgetLiveActivity.swift
//  PuzzleWidget
//
//  Created by Germán Gomez on 20/10/2025.
//

import ActivityKit
import WidgetKit
import SwiftUI

struct PuzzleWidgetAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        // Dynamic stateful properties about your activity go here!
        var emoji: String
    }

    // Fixed non-changing properties about your activity go here!
    var name: String
}

struct PuzzleWidgetLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: PuzzleWidgetAttributes.self) { context in
            // Lock screen/banner UI goes here
            VStack {
                Text("Hello \(context.state.emoji)")
            }
            .activityBackgroundTint(Color.cyan)
            .activitySystemActionForegroundColor(Color.black)

        } dynamicIsland: { context in
            DynamicIsland {
                // Expanded UI goes here.  Compose the expanded UI through
                // various regions, like leading/trailing/center/bottom
                DynamicIslandExpandedRegion(.leading) {
                    Text("Leading")
                }
                DynamicIslandExpandedRegion(.trailing) {
                    Text("Trailing")
                }
                DynamicIslandExpandedRegion(.bottom) {
                    Text("Bottom \(context.state.emoji)")
                    // more content
                }
            } compactLeading: {
                Text("L")
            } compactTrailing: {
                Text("T \(context.state.emoji)")
            } minimal: {
                Text(context.state.emoji)
            }
            .widgetURL(URL(string: "http://www.apple.com"))
            .keylineTint(Color.red)
        }
    }
}

extension PuzzleWidgetAttributes {
    fileprivate static var preview: PuzzleWidgetAttributes {
        PuzzleWidgetAttributes(name: "World")
    }
}

extension PuzzleWidgetAttributes.ContentState {
    fileprivate static var smiley: PuzzleWidgetAttributes.ContentState {
        PuzzleWidgetAttributes.ContentState(emoji: "😀")
     }
     
     fileprivate static var starEyes: PuzzleWidgetAttributes.ContentState {
         PuzzleWidgetAttributes.ContentState(emoji: "🤩")
     }
}

#Preview("Notification", as: .content, using: PuzzleWidgetAttributes.preview) {
   PuzzleWidgetLiveActivity()
} contentStates: {
    PuzzleWidgetAttributes.ContentState.smiley
    PuzzleWidgetAttributes.ContentState.starEyes
}
