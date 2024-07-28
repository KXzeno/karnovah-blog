import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.io.IOException;
import java.nio.file.StandardOpenOption;

public class RectifySchema {
  // File schemaFile = new File("prisma/schema.prisma");
  public RectifySchema() {}

  public void rectify() {
    File schemaFile = new File("prisma/schema.prisma");
    Path schemaPath = schemaFile.toPath();

    try {
      String content = Files.readString(schemaPath);
      content = content.replaceAll("\\bSection\\b(?!\\s*([\\{\\[]))\\b", "sections");
      content = content.replaceAll("\\bCategory\\b(?!\\s*([\\{\\[]))\\b", "categories");
      Files.write(schemaPath, content.getBytes());
    } catch (IOException x) {
      x.printStackTrace();
    }
  }

  public static void main(String[] args) {
    RectifySchema arbiter = new RectifySchema();
    arbiter.rectify();
  }
}
