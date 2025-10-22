//
//  PuzzleWidget.swift
//  PuzzleWidget
//
//  Created by Germán Gomez on 20/10/2025.
//

import WidgetKit
import SwiftUI
import Foundation
import AppIntents

// Minimal model used by the widget
struct WidgetUser: Codable, Identifiable {
  var id: String { email }
  let name: String
  let email: String
  let catchPhrase: String
}

// Build a deep link to open the app for a specific user (by email as stable id)
func userDeepLink(_ user: WidgetUser) -> URL? {
  var comps = URLComponents()
  comps.scheme = "rnwidgets"
  comps.host = "users"
  comps.queryItems = [URLQueryItem(name: "user", value: user.email), URLQueryItem(name: "name", value: user.name), URLQueryItem(name: "catchPhrase", value: user.catchPhrase)]
  return comps.url
}

// Fetch and map users from the public API
func fetchUsers() async -> [WidgetUser] {
  guard let url = URL(string: "https://jsonplaceholder.typicode.com/users") else { return [] }
  do {
    let (data, _) = try await URLSession.shared.data(from: url)
    struct APIUser: Decodable {
      let name: String
      let email: String
      let company: Company
      struct Company: Decodable { let name: String; let catchPhrase: String }
    }
    let decoded = try JSONDecoder().decode([APIUser].self, from: data)
    return decoded.map { u in
      WidgetUser(
        name: u.name,
        email: u.email,
        catchPhrase: u.company.catchPhrase
      )
    }
  } catch {
    return []
  }
}

struct Provider: AppIntentTimelineProvider {
  func placeholder(in context: Context) -> SimpleEntry {
    SimpleEntry(date: Date(), configuration: ConfigurationAppIntent(), users: [])
  }
  
  func snapshot(for configuration: ConfigurationAppIntent, in context: Context) async -> SimpleEntry {
    let users = await fetchUsers()
    return SimpleEntry(date: Date(), configuration: configuration, users: users)
  }
  
  func timeline(for configuration: ConfigurationAppIntent, in context: Context) async -> Timeline<SimpleEntry> {
    let users = await fetchUsers()
    let now = Date()
    let entry = SimpleEntry(date: now, configuration: configuration, users: users)
    // Refresh every 30 minutes; adjust as needed
    let next = Calendar.current.date(byAdding: .minute, value: 30, to: now)!
    return Timeline(entries: [entry], policy: .after(next))
  }
}

struct SimpleEntry: TimelineEntry {
  let date: Date
  let configuration: ConfigurationAppIntent
  let users: [WidgetUser]
}

struct PuzzleWidgetEntryView : View {
  var entry: Provider.Entry
  var body: some View {
    VStack(alignment: .leading, spacing: 0) {
      HStack {
        Image(systemName: "star.fill") // Using an SF Symbol
                        .font(.title)
                        .foregroundColor(.yellow)
        Text("Rewards Balance Widget")
          .bold()
          .frame(height: 8)
      }
      .padding()
      if entry.users.isEmpty {
        Text("No users").font(.caption)
      } else {
        let maxItems = 3 // medium only
        ForEach(entry.users.prefix(maxItems)) { u in
          if let url = userDeepLink(u) {
            Link(destination: url) {
              VStack(alignment: .leading, spacing: 2) {
                Text(u.name).font(.system(size: 12, weight: .semibold))
                Text("$250 cashback").font(.system(size: 12))
              }
            }
          }
          if u.id != entry.users.prefix(maxItems).last?.id {
            Divider().opacity(0.2)
          }
        }
      }
      
    }
    .padding(.horizontal, 5)
    .padding(.vertical, 50)
    .background(Color.blue)
    
  }
}

struct PuzzleWidget: Widget {
  let kind: String = "PuzzleWidget"
  
  var body: some WidgetConfiguration {
    AppIntentConfiguration(kind: kind, intent: ConfigurationAppIntent.self, provider: Provider()) { entry in
      PuzzleWidgetEntryView(entry: entry)
        .containerBackground(.fill.tertiary, for: .widget)
    }
    .supportedFamilies([.systemMedium, .systemLarge])
  }
}

extension ConfigurationAppIntent {
  fileprivate static var smiley: ConfigurationAppIntent {
    let intent = ConfigurationAppIntent()
    intent.favoriteEmoji = "😀"
    return intent
  }
  
  fileprivate static var starEyes: ConfigurationAppIntent {
    let intent = ConfigurationAppIntent()
    intent.favoriteEmoji = "🤩"
    return intent
  }
}

#Preview(as: .systemSmall) {
  PuzzleWidget()
} timeline: {
  SimpleEntry(date: .now, configuration: .smiley, users: [])
  SimpleEntry(date: .now, configuration: .starEyes, users: [])
}

// AppIntent used for refreshing the widget timeline on demand
@available(iOS 16.0, *)
struct RefreshUsersIntent: AppIntent {
  static var title: LocalizedStringResource = "Refresh Users"
  
  func perform() async throws -> some IntentResult {
    WidgetCenter.shared.reloadTimelines(ofKind: "PuzzleWidget")
    return .result()
  }
}
