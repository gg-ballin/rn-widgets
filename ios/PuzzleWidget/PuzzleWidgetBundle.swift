//
//  PuzzleWidgetBundle.swift
//  PuzzleWidget
//
//  Created by Germán Gomez on 20/10/2025.
//

import WidgetKit
import SwiftUI

@main
struct PuzzleWidgetBundle: WidgetBundle {
    var body: some Widget {
        PuzzleWidget()
        PuzzleWidgetControl()
        PuzzleWidgetLiveActivity()
    }
}
