import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.io.IOException;
// import java.nio.file.StandardOpenOption;
import java.util.List;

public class RectifySchema {
  // File schemaFile = new File("prisma/schema.prisma");
  public RectifySchema() {}

  public void rectify() {
    File schemaFile = new File("prisma/schema.prisma");
    Path schemaPath = schemaFile.toPath();
    StringBuilder finalContent = new StringBuilder();

    try {
      List<String> contents = Files.readAllLines(schemaPath);
      while (contents.isEmpty() != true) {
        String content = contents.get(0);
        content = content.replaceAll("\\bSection\\b(?!\\s*([\\{\\[]))\\b", "sections");
        content = content.replaceAll("\\bCategory\\b(?!\\s*([\\{\\[]))\\b", "categories");
        finalContent.append(content + "\n");
        contents.remove(0);
      }
      Files.write(schemaPath, finalContent.toString().getBytes());
    } catch (IOException x) {
      x.printStackTrace();
    }
  }

  public static void main(String[] args) {
    RectifySchema arbiter = new RectifySchema();
    arbiter.rectify();
  }
}
